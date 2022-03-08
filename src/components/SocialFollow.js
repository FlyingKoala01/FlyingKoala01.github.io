import React from "react";

import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord
} from "react-icons/fa";

export default function SocialFollow() {
  return (
    <div className="social-container">
      <h3>@LearnBuildTeach</h3>
      <a href="https://twitter.com/FlyingKoala01" className="twitter social">
        <FaTwitter/>
      </a>
      <a
        href="https://github.com/FlyingKoala01" className="GitHub social"
      >
        <FaGithub/>
      </a>
      <a
        href="https://www.linkedin.com/in/isaac-iglesias-vila-0b6074234/" className="Linkedin social"
      >
        <FaLinkedin/>
      </a>
      <a
        href="https://discordapp.com/users/FlyingKoala#1509/" className="Discord social"
      >
        <FaDiscord/>
      </a>
    </div>
  );
}
