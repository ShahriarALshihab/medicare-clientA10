"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import axiosPublic from "@/lib/axiosPublic";

const SuccessStories = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosPublic.get("/reviews/recent").then((res) => setReviews(res.data));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="section-padding mx-auto max-w-7xl py-16">
      <div className="mb-10 text-center">
        <p className="font-body text-sm font-semibold uppercase tracking-wider text-primary">Real Stories</p>
        <h2 className="font-display text-3xl font-bold text-ink">Patient Success Stories</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review._id} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <FaQuoteLeft className="mb-3 text-primary/30" size={22} />
            <p className="font-body text-sm text-ink/70">{review.reviewText}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary-light">
                {review.patientPhoto && (
                  <Image src={review.patientPhoto} alt={review.patientName} fill className="object-cover" />
                )}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-ink">{review.patientName}</p>
                <div className="flex text-amber-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} size={11} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
