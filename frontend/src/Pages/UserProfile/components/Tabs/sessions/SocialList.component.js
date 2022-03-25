import React from "react";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  LinkedinFilled,
  GithubFilled,
} from "@ant-design/icons";

export const SocialList = ({
  facebook,
  instagram,
  twitter,
  linkedin,
  github,
}) => {
  const socialsArray = [
    {
      icon: <FacebookFilled style={{ color: "#1877F2" }} />,
      link: facebook || null,
      tooltip: "Facebook",
    },
    {
      icon: (
        <InstagramFilled
          style={{
            color: "#E1306C",
          }}
        />
      ),
      link: instagram || null,
      tooltip: "Instagram",
    },
    {
      icon: <TwitterOutlined style={{ color: "#1DA1F2" }} />,
      link: twitter || null,
      tooltip: "Twitter",
    },
    {
      icon: <LinkedinFilled style={{ color: "#0A66C2" }} />,
      link: linkedin || null,
      tooltip: "LinkedIn",
    },
    {
      icon: <GithubFilled style={{ color: "#333" }} />,
      link: github || null,
      tooltip: "Github",
    },
  ];
  return socialsArray;
};
