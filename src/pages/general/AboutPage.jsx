import { FaMountain, FaLeaf, FaHandsHelping, FaAward } from 'react-icons/fa';

const AboutPage = () => {
  const values = [
    {
      icon: <FaMountain className="w-8 h-8" />,
      title: 'Alpine Heritage',
      description: 'Sourced from pristine European mountains where nature thrives'
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: 'Pure & Natural',
      description: 'No artificial additives, just nature\'s goodness preserved'
    },
    {
      icon: <FaHandsHelping className="w-8 h-8" />,
      title: 'Sustainable',
      description: 'Supporting local farmers and sustainable practices'
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Rigorous quality standards for every product'
    }
  ];
  
  const team = [
    {
      name: 'Hans Müller',
      role: 'Founder & CEO',
      bio: 'Third-generation farmer from Swiss Alps',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sophie Dubois',
      role: 'Product Director',
      bio: 'Food scientist from Lyon, France',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Marco Rossi',
      role: 'Supply Chain',
      bio: 'Connecting with farmers across Europe',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop&q=80"
            alt="Swiss Alps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-200">
              Bringing Europe's finest natural products from alpine farms to your table
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20">
        {/* Mission */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Alpine Harvest, we believe in preserving the authentic flavors of Europe's most 
            pristine regions. Our journey began in the Swiss Alps, where generations of farmers 
            have cultivated the land with respect for nature. Today, we connect these traditional 
            producers with modern consumers who value quality, purity, and sustainability.
          </p>
        </div>
        
        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80"
              alt="Alpine Farm"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              From Alpine Farms
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Each product in our collection tells a story - of traditional farming methods, 
              careful harvesting, and respect for the environment. We work directly with 
              small-scale producers across Switzerland, France, Italy, and Greece.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Direct partnerships with European farmers</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Traditional, sustainable farming practices</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Carbon-neutral shipping across Europe</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Team */}
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
