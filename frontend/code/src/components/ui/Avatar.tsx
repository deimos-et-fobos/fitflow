import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 64, className = "" }) => {
  return (
    <img
      src={src || "/assets/user-placeholder.png"}
      alt={alt}
      className={`rounded-full object-cover border border-gray-200 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar; 