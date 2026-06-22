import Banner from "@/components/Home/Banner";
import FeaturedDoctors from "@/components/Home/FeaturedDoctors";
import Specializations from "@/components/Home/Specializations";
import PlatformStats from "@/components/Home/PlatformStats";
import SuccessStories from "@/components/Home/SuccessStories";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Specializations />
      <FeaturedDoctors />
      <PlatformStats />
      <SuccessStories />
      <WhyChooseUs />
    </>
  );
}
