import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  FaCheckCircle,
  FaCar,
  FaUsers,
  FaShieldAlt,
  FaGlobe,
  FaHeadset,
  FaAward,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Content slide in from left
      gsap.fromTo(
        contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      // Features stagger animation
      gsap.fromTo(
        featuresRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <FaCar />, number: "500+", label: "Vehicles" },
    { icon: <FaUsers />, number: "10K+", label: "Happy Customers" },
    { icon: <FaGlobe />, number: "50+", label: "Locations" },
    { icon: <FaAward />, number: "4.8", label: "Rating" },
  ];

  const features = [
    {
      icon: <FaCheckCircle className="text-3xl text-[#0ea5e9]" />,
      title: "Easy Booking",
      description:
        "Book your perfect vehicle in just a few clicks with our intuitive platform",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-[#14b8a6]" />,
      title: "Secure & Safe",
      description:
        "All vehicles are verified and insured for your complete peace of mind",
    },
    {
      icon: <FaHeadset className="text-3xl text-[#0ea5e9]" />,
      title: "24/7 Support",
      description:
        "Our dedicated team is always ready to assist you at any time",
    },
    {
      icon: <FaGlobe className="text-3xl text-[#14b8a6]" />,
      title: "Wide Coverage",
      description:
        "Access vehicles across multiple cities and locations nationwide",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20  relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1d70dd] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
              TravelEase
            </span>
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your trusted partner for seamless vehicle booking and unforgettable
            journeys
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto mb-20">
          {/* Left Column - Text Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-4">
              <h3
                className="text-3xl font-bold text-[#4b99ff]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Revolutionizing Vehicle Booking
              </h3>
              <p
                className="text-lg text-slate-500 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                TravelEase is your one-stop solution for hassle-free vehicle
                rentals. We connect travelers with quality vehicles and trusted
                owners, making your journey planning effortless and enjoyable.
              </p>
              <p
                className="text-lg text-slate-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Whether you're planning a weekend getaway, a business trip, or a
                family vacation, we offer a diverse fleet of vehicles to match
                your needs. From compact cars to spacious vans, luxury sedans to
                rugged SUVs - find your perfect ride with us.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-linear-to-r from-[#0ea5e9]/10 to-[#14b8a6]/10 border-l-4 dark:bg-slate-300 border-[#0ea5e9] rounded-xl p-6">
              <h4
                className="text-xl font-bold text-[#002f6c] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Our Mission
              </h4>
              <p
                className="text-slate-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                To make travel accessible, affordable, and stress-free for
                everyone by providing a seamless platform that connects
                travelers with trusted vehicle owners.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/allVehicles"
              className="inline-block btn btn-lg bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Fleet
            </Link>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="TravelEase vehicles"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#002f6c]/80 via-transparent to-transparent"></div>

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/90 rounded-2xl p-4 shadow-xl">
                <p
                  className="text-[#002f6c] font-bold text-lg"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Trusted by thousands of travelers
                </p>
                <p
                  className="text-slate-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Join our community today
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-[#0ea5e9] to-[#14b8a6] rounded-full blur-2xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-linear-to-br from-[#14b8a6] to-[#0ea5e9] rounded-full blur-2xl opacity-50 -z-10"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 text-center transform hover:-translate-y-1"
            >
              <div className="text-4xl text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h4
                className="text-3xl font-bold text-[#002f6c] mb-1"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {stat.number}
              </h4>
              <p
                className="text-slate-600 font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <h3
            className="text-3xl md:text-4xl font-bold text-[#3280e6] text-center mb-12"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
              Us?
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 text-center transform hover:-translate-y-2 group"
              >
                <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4
                  className="text-xl font-bold text-[#002f6c] mb-3 group-hover:text-[#0ea5e9] transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-slate-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
