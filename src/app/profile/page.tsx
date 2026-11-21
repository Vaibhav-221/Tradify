"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Camera, LogOut, Pencil, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Modal } from "@/components/modal";
import { ProtectedShell } from "@/components/protected-shell";
import { usePrototype } from "@/components/prototype-provider";
import { Button } from "@/components/ui/button";
import { readImageFile } from "@/lib/image";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    listings,
    wishlist,
    lookingForRequests,
    updateUser,
    logout,
    notify,
  } = usePrototype();
  const [editing, setEditing] = useState(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null | undefined>(
    undefined,
  );
  const [imageRevision, setImageRevision] = useState(0);
  const [imageError, setImageError] = useState("");

  if (!user) return <ProtectedShell><div /></ProtectedShell>;

  const myListings = listings.filter((listing) => listing.sellerId === user.id);
  const requests = lookingForRequests.filter(
    (request) => request.userId === user.id,
  );
  const stats = [
    { label: "Total listings", value: myListings.length },
    { label: "Favorites", value: wishlist.length },
    { label: "Looking For requests", value: requests.length },
    {
      label: "Sold / reserved",
      value: myListings.filter(
        (listing) => listing.status === "sold" || listing.status === "reserved",
      ).length,
    },
  ];

  function chooseProfileImage(file: File | undefined) {
    setImageError("");
    if (!file) return;
    void readImageFile(file)
      .then((dataUrl) => {
        setProfileImage(dataUrl);
        setImageRevision((revision) => revision + 1);
      })
      .catch((error: unknown) => {
        setImageError(
          error instanceof Error ? error.message : "Unable to load this image.",
        );
      });
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value.trim() : "";
    };
    const name = text("name");
    const email = text("email");
    const studentId = text("studentId");
    const phone = text("phone");
    const branch = text("branch");
    const year = text("year");
    const hostel = text("hostel");
    const bio = text("bio");

    if (!name || !email || !studentId || !branch || !year || !hostel) {
      notify("Please complete all required profile fields.");
      return;
    }
    if (profileImage === null) {
      updateUser({
        name,
        email,
        studentId,
        phone,
        branch,
        year,
        hostel,
        bio,
        profileImage: undefined,
      });
    } else {
      updateUser({
        name,
        email,
        studentId,
        phone,
        branch,
        year,
        hostel,
        bio,
        ...(profileImage ? { profileImage } : {}),
      });
    }
    setProfileImage(undefined);
    setEditing(false);
    notify("Profile updated.");
  }

  function cancelEdit() {
    setEditing(false);
    setProfileImage(undefined);
    setImageError("");
  }

  function confirmLogout() {
    logout();
    notify("You have been logged out.");
    router.replace("/login");
  }

  const avatar = profileImage === null ? undefined : profileImage ?? user.profileImage;

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <motion.div
              key={`${imageRevision}-${Boolean(avatar)}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary"
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={`${user.name} profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound className="h-9 w-9 text-muted-foreground" />
              )}
            </motion.div>
            <div>
              <p className="text-sm text-primary">Student profile</p>
              <motion.h1
                key={user.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 text-3xl font-semibold tracking-tight"
              >
                {user.name}
              </motion.h1>
              <motion.p
                key={user.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mt-1 text-sm text-muted-foreground"
              >
                {user.email}
              </motion.p>
            </div>
          </div>
          {!editing ? (
            <Button type="button" onClick={() => setEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
        {editing ? (
          <motion.form
            key="profile-edit"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            onSubmit={saveProfile}
            className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium">Profile picture</p>
              {avatar ? (
                <motion.div
                  key={imageRevision}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatar}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfileImage(null);
                      setImageRevision((revision) => revision + 1);
                    }}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </motion.div>
              ) : null}
              <label
                htmlFor="profile-image"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
              >
                <Camera className="h-4 w-4" />
                Choose profile image
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => chooseProfileImage(event.target.files?.[0])}
              />
              <p className="text-xs text-muted-foreground">
                JPG, PNG, or WebP up to 1 MB. Stored only in this browser.
              </p>
              {imageError ? (
                <p role="alert" className="text-sm text-red-300">
                  {imageError}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name", user.name, "text"],
                ["email", "Email", user.email, "email"],
                ["studentId", "Student ID", user.studentId, "text"],
                ["phone", "Phone number", user.phone ?? "", "tel"],
                ["branch", "Branch", user.branch, "text"],
                ["year", "Year", user.year, "text"],
                ["hostel", "Hostel", user.hostel, "text"],
              ].map(([name, label, value, type]) => (
                <div key={name} className="space-y-2">
                  <label htmlFor={`profile-${name}`} className="text-sm">
                    {label}
                  </label>
                  <input
                    id={`profile-${name}`}
                    name={name}
                    type={type}
                    required={name !== "phone"}
                    defaultValue={value}
                    maxLength={100}
                    className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label htmlFor="profile-bio" className="text-sm">
                Bio
              </label>
              <textarea
                id="profile-bio"
                name="bio"
                maxLength={300}
                rows={3}
                defaultValue={user.bio}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm"
                placeholder="A little about you (optional)"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="profile-details"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            layout
            transition={{ duration: 0.22 }}
            className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                ["Student ID", user.studentId],
                ["Phone", user.phone || "Not provided"],
                ["Branch", user.branch],
                ["Year", user.year],
                ["Hostel", user.hostel],
                ["Bio", user.bio || "No bio yet"],
              ].map(([label, value]) => (
                <motion.div key={label} layout>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-5">
              <Button asChild variant="outline" size="sm">
                <Link href="/my-listings">My Listings</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/wishlist">Favorites</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/looking-for">Looking For</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/home">Return Home</Link>
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold">Account</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Log out of Tradify on this device.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setLogoutConfirmationOpen(true)}
            className="self-start sm:self-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </section>
      {logoutConfirmationOpen ? (
        <Modal
          title="Log out?"
          onClose={() => setLogoutConfirmationOpen(false)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLogoutConfirmationOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={confirmLogout}>
                Log out
              </Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out of Tradify on this device?
          </p>
        </Modal>
      ) : null}
    </ProtectedShell>
  );
}
