import { SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import userIcon from "../assets/t1.jpeg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
} from "@/services/authApi";

const UserProfile = () => {
  const { data } = useGetCurrentUserQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const user = data?.data;

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleProfileUpdate() {
    setIsEditing((status) => !status);
    if (isEditing) {
      await updateProfile(userData).unwrap();
    }
  }

  if (!user) return null;

  return (
    <>
      <div className="flex justify-between">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.imgUrl} alt="user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          onClick={handleProfileUpdate}
          className="flex gap-2 bg-dark-500 p-6 text-base font-normal text-white"
        >
          <SquarePenIcon />
          {isEditing ? "Save Changes" : " Edit Profile"}
        </Button>
      </div>
      <form className="mt-8 grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 ">
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            className="border-dark-500 p-6 text-lg capitalize"
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            className="border-dark-500 p-6 text-lg capitalize"
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            className="border-dark-500 p-6 text-lg"
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email Address</Label>
          <Input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="border-dark-500 p-6 text-lg"
            disabled={!isEditing}
          />
        </div>
      </form>
    </>
  );
};

export default UserProfile;
