// src/components/About/About.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlane, FaCar, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const featuresRef = useRef([]);
  const teamRef = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
      },
    });

    // Animate feature cards on scroll
    featuresRef.current.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        delay: index * 0.2,
      });
    });

    // Animate team cards on scroll
    teamRef.current.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        delay: index * 0.2,
      });
    });
  }, []);

  const features = [
    {
      icon: <FaPlane size={24} />,
      title: "Easy Booking",
      desc: "Book vehicles quickly with just a few clicks.",
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Secure Payments",
      desc: "Safe and secure payment gateway for peace of mind.",
    },
    {
      icon: <FaCalendarAlt size={24} />,
      title: "Trip Management",
      desc: "Organize and manage your trips efficiently.",
    },
    {
      icon: <FaCar size={24} />,
      title: "Verified Vehicles",
      desc: "Only reliable and verified vehicles for your journey.",
    },
  ];

  const team = [
    { name: "John Doe", role: "Founder & CEO", photo: "/assets/team1.jpg" },
    { name: "Sarah Lee", role: "Lead Developer", photo: "/assets/team2.jpg" },
    { name: "Mike Chen", role: "Product Manager", photo: "/assets/team3.jpg" },
    { name: "Anna Smith", role: "UI/UX Designer", photo: "/assets/team4.jpg" },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative bg-blue-500 dark:bg-blue-700 text-white py-24 px-6 text-center rounded-b-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover the World with TravelEase
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          We make vehicle booking and trip planning seamless, fun, and safe for
          every traveler.
        </p>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRef.current[index] = el)}
              className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-6 md:px-16 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              ref={(el) => (teamRef.current[index] = el)}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-xl">{member.name}</h3>
              <p className="text-blue-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Plan Your Next Trip with Ease
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Join TravelEase today and enjoy seamless booking, verified vehicles,
          and complete trip management at your fingertips.
        </p>
        <Link
          to="/register"
          className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default About;
