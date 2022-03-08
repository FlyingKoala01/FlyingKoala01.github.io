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
      <a href="https://twitter.com/FlyingKoala01" className="twitterSocial">
        <FaTwitter size="40px" pulse color="#00acee"/>
      </a>
      <a href="https://github.com/FlyingKoala01" className="githubSocial">
        <FaGithub size="40px" pulse color="white"/>
      </a>
      <a href="https://www.linkedin.com/in/isaac-iglesias-vila-0b6074234/" className="linkedinSocial">
        <FaLinkedin size="40px" pulse color="#00a0dc"/>
      </a>
      <a href="https://discordapp.com/users/FlyingKoala#1509/" className="discordSocial">
        <FaDiscord size="40px" pulse color="#5865f2"/>
      </a>
    </div>
  );
}
