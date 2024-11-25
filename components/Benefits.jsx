// components/Benefits.jsx

import Image from "next/image";

const benefitsData = [
  {
    title: "Relieves Stress",
    image: "/images/benefits/relieve-stress.jpeg",
    alt: "Relieves Stress",
  },
  {
    title: "Improves Mood",
    image: "/images/benefits/improves-mood.jpeg",
    alt: "Improves Mood",
  },
  {
    title: "Boosts Circulation",
    image: "/images/benefits/boost-circulation.jpeg",
    alt: "Boosts Circulation",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#f3e7d1] py-16 px-4 text-center text-gray-800">
      <h2 className="text-3xl font-semibold mb-12 font-serif text-brown-700">
        Benefits of a Massage
      </h2>
      <div className="w-full max-w-none lg:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitsData.map((benefit, index) => (
          <div
            key={index}
            className="relative h-64 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <Image
              src={benefit.image}
              alt={benefit.alt}
              quality={80}
              fill
              sizes="(max-width: 640px) 100vw, 
              (max-width: 1024px) 50vw, 
              33vw"
              className="rounded-lg cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
              <div className="text-center text-white px-4">
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  {benefit.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
