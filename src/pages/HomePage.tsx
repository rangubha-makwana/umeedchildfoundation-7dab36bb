import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  BookOpen, 
  Users, 
  MapPin, 
  GraduationCap,
  Mail,
  Phone,
  Instagram,
  ChevronRight,
  Star,
  Send,
  Loader2,
  Calendar,
  Sparkles,
  Quote,
  Award,
  Palette,
  Shield,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FloatingWhatsApp } from '@/components/home/FloatingWhatsApp';
import { ImageCarousel } from '@/components/home/ImageCarousel';
import { AnimatedCounter } from '@/components/home/AnimatedCounter';
import { ParticleBackground } from '@/components/home/ParticleBackground';
import { TypewriterText } from '@/components/home/TypewriterText';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Gallery images
const galleryImages = [
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=675&fit=crop',
  'https://images.unsplash.com/photo-1529390079861-591f8f0e3c60?w=1200&h=675&fit=crop',
];

export default function HomePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    preferredLocation: '',
    message: ''
  });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Confetti celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#22d3ee', '#fbbf24', '#10b981']
    });
    
    toast({
      title: "🎉 Thank you for joining us!",
      description: "We've received your application. Our team will contact you soon.",
    });
    
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      profession: '',
      preferredLocation: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Heart className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-lg text-foreground">Umeed Child Foundation</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              {[
                { name: 'About', id: 'about' },
                { name: 'Our Values', id: 'values' },
                { name: 'Locations', id: 'locations' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Join Us', id: 'join' },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </motion.button>
              ))}
              <Link to="/login">
                <Button variant="outline" size="sm" className="group">
                  Login
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--secondary)/0.1) 50%, hsl(var(--background)) 100%)',
          }}
        />
        
        {/* Particle effect */}
        <ParticleBackground />
        
        {/* Animated wave pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f97316' d='M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
          }}
        />
        
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-semibold">Every Sunday, we bring hope through education</span>
          </motion.div>
          
          {/* Main heading with floating animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-foreground mb-4 leading-tight"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Umeed Child
              <motion.span 
                className="block text-primary"
                animate={{ 
                  textShadow: [
                    "0 0 20px hsl(var(--primary)/0.3)",
                    "0 0 40px hsl(var(--primary)/0.5)",
                    "0 0 20px hsl(var(--primary)/0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Foundation
              </motion.span>
            </motion.h1>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            className="text-xl md:text-3xl text-foreground/80 mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Together, We Stand for Every Child's Dream
          </motion.p>
          
          {/* Typewriter motto */}
          <motion.div 
            className="text-lg md:text-xl text-muted-foreground mb-10 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypewriterText 
              text="Every child is an untold story. Let's help them create a hopeful future."
              delay={1000}
              speed={40}
            />
          </motion.div>
          
          {/* Stats counters */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto mb-12"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <AnimatedCounter end={65} suffix="+" label="Children" icon={Users} />
            <AnimatedCounter end={40} suffix="+" label="Volunteers" icon={GraduationCap} />
            <AnimatedCounter end={2} suffix="" label="Locations" icon={MapPin} />
            <AnimatedCounter end={52} suffix="" label="Sundays/Year" icon={Calendar} />
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="xl" 
                className="w-full sm:w-auto group relative overflow-hidden"
                onClick={() => scrollToSection('join')}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ opacity: 0.3 }}
                />
                <Heart className="w-5 h-5 mr-2" />
                Join as Volunteer
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/login">
                <Button size="xl" variant="outline" className="w-full sm:w-auto group border-2">
                  Admin / Volunteer Login
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Our Story
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground mb-8"
            >
              How It All Began
            </motion.h2>
            <motion.p 
              variants={fadeInUp} 
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              At our NGO, we are dedicated to empowering underprivileged children through education every Sunday. 
              Our mission is to provide a nurturing environment where students can learn, grow, and thrive. 
              Each session begins with a prayer, fostering a sense of community and connection to our culture.
            </motion.p>
            <motion.p 
              variants={fadeInUp} 
              className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-6"
            >
              We believe that learning should be fun and engaging. That's why we incorporate creative activities, 
              such as crafts and games, to inspire creativity and imagination. Alongside our study sessions, 
              we emphasize the importance of values and discipline, helping our students develop not only 
              academically but also personally.
            </motion.p>
          </motion.div>

          {/* Founders */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              { name: 'Mukesh Chauhan', role: 'Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
              { name: 'Priya Mehta', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face' },
              { name: 'Arjun Patel', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
            ].map((founder, index) => (
              <motion.div
                key={founder.name}
                variants={scaleIn}
                className="text-center group"
              >
                <motion.div 
                  className="w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 mb-6 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-primary font-medium">{founder.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              What We Stand For
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              variants={fadeInUp} 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              At Umeed Child Foundation, our core values are the foundation of everything we do.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: 'Education',
                description: 'We believe every child deserves access to quality education to equip them for success',
                color: 'from-orange-500 to-amber-500'
              },
              {
                icon: Award,
                title: 'Respect',
                description: 'We promote kindness and empathy, teaching children to value themselves and others',
                color: 'from-cyan-500 to-teal-500'
              },
              {
                icon: Shield,
                title: 'Discipline',
                description: 'We emphasize responsibility and hard work, helping children develop perseverance',
                color: 'from-violet-500 to-purple-500'
              },
              {
                icon: Palette,
                title: 'Creativity',
                description: 'We foster creativity through fun activities, encouraging children to explore their talents',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="group"
              >
                <motion.div 
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 h-full relative overflow-hidden"
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { value: '65+', label: 'Children Enrolled', icon: Users },
              { value: '40+', label: 'Active Volunteers', icon: GraduationCap },
              { value: '2', label: 'Teaching Centers', icon: MapPin },
              { value: '100+', label: 'Sessions Conducted', icon: Calendar },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-card rounded-xl p-6 text-center border border-border/50 shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Find Us
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground"
            >
              Our Teaching Centers
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Andheri East Center',
                address: 'Near XYZ School, Andheri East, Mumbai',
                timing: 'Every Sunday, 10:00 AM - 1:00 PM',
                phone: '+91 89800 90465',
                mapUrl: 'https://maps.google.com/?q=Andheri+East+Mumbai'
              },
              {
                name: 'Bandra West Center',
                address: 'Community Hall, Bandra West, Mumbai',
                timing: 'Every Sunday, 10:00 AM - 1:00 PM',
                phone: '+91 89800 90465',
                mapUrl: 'https://maps.google.com/?q=Bandra+West+Mumbai'
              }
            ].map((location, index) => (
              <motion.div
                key={location.name}
                initial={index === 0 ? fadeInLeft.initial : fadeInRight.initial}
                whileInView={index === 0 ? fadeInLeft.animate : fadeInRight.animate}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <motion.div 
                  className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border/50"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-56 bg-gradient-to-br from-primary/20 via-secondary/10 to-background flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <MapPin className="w-20 h-20 text-primary/30" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{location.name}</h3>
                    <div className="space-y-3">
                      <motion.p 
                        className="text-muted-foreground flex items-start gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                        {location.address}
                      </motion.p>
                      <motion.p 
                        className="text-muted-foreground flex items-center gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <Calendar className="w-5 h-5 shrink-0 text-primary" />
                        {location.timing}
                      </motion.p>
                      <motion.a 
                        href={`tel:${location.phone}`}
                        className="text-muted-foreground flex items-center gap-3 hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                          <Phone className="w-5 h-5 shrink-0 text-primary" />
                        </motion.div>
                        {location.phone}
                      </motion.a>
                    </div>
                    <motion.a 
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-primary font-semibold group"
                      whileHover={{ scale: 1.05 }}
                    >
                      View on Google Maps
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={scaleIn}>
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Make a Difference
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            >
              Become a Volunteer
            </motion.h2>
            <motion.p 
              variants={fadeInUp} 
              className="text-xl text-muted-foreground"
            >
              Gift a child hope. Join our family of 40+ volunteers today.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'fullName', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                    { id: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                    { id: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                    { id: 'profession', label: 'Profession / Student?', placeholder: 'e.g., Software Engineer', type: 'text' },
                  ].map((field, index) => (
                    <motion.div 
                      key={field.id}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Label htmlFor={field.id}>{field.label} *</Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        className="h-12"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="location">Preferred Location *</Label>
                  <Select
                    value={formData.preferredLocation}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredLocation: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="andheri">Andheri East</SelectItem>
                      <SelectItem value="bandra">Bandra West</SelectItem>
                      <SelectItem value="either">Either Location</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us why you want to volunteer..."
                    rows={4}
                    className="resize-none"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg"
                    disabled={isSubmitting || !formData.fullName || !formData.email || !formData.phone || !formData.profession || !formData.preferredLocation}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Gallery
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground"
            >
              Moments of Joy
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ImageCarousel images={galleryImages} autoPlayInterval={4000} />
          </motion.div>

          {/* Thumbnail grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-8"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <img
                  src={image.replace('1200', '200').replace('675', '200')}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-6xl font-bold text-foreground"
            >
              What People Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Sneha Kapoor',
                role: 'Volunteer for 6 months',
                quote: 'Teaching these children every Sunday has been the most fulfilling experience of my life. Their eagerness to learn inspires me every week.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Ramesh Iyer',
                role: 'Parent',
                quote: 'My daughter has shown tremendous improvement since joining Umeed. The volunteers treat every child with so much love and patience.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Anita Deshmukh',
                role: 'Volunteer for 1 year',
                quote: 'Being part of Umeed Child Foundation has taught me that small actions can create big changes. Every child deserves a chance to dream.',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
              >
                <motion.div 
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 relative h-full"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated quote mark */}
                  <motion.div
                    className="absolute -top-4 -left-2 text-primary/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <Quote className="w-16 h-16" />
                  </motion.div>
                  
                  <div className="flex items-center gap-1 text-amber-500 mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 relative z-10 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-sidebar text-sidebar-foreground py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <span className="font-bold text-lg">Umeed Child Foundation</span>
              </motion.div>
              <p className="text-sidebar-muted mb-6 max-w-sm leading-relaxed">
                Every Sunday, we bring hope through education. Join us in making a difference in children's lives.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: () => (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ), href: 'https://wa.me/918980090465', label: 'WhatsApp' },
                  { icon: Mail, href: 'mailto:contact@umeedchild.org', label: 'Email' },
                ].map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sidebar-muted">
                {[
                  { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                  { name: 'About Us', action: () => scrollToSection('about') },
                  { name: 'Our Values', action: () => scrollToSection('values') },
                  { name: 'Join Us', action: () => scrollToSection('join') },
                ].map((link) => (
                  <li key={link.name}>
                    <motion.button 
                      onClick={link.action}
                      className="hover:text-sidebar-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
                <li>
                  <Link to="/login">
                    <motion.span 
                      className="hover:text-sidebar-foreground transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      Login
                    </motion.span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sidebar-muted">
                <motion.li 
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Mail className="w-4 h-4 text-primary" />
                  </motion.div>
                  contact@umeedchild.org
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}>
                    <Phone className="w-4 h-4 text-primary" />
                  </motion.div>
                  +91 89800 90465
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 mt-1 text-primary" />
                  Mumbai, Maharashtra, India
                </motion.li>
              </ul>
            </div>
          </div>

          <motion.div 
            className="border-t border-sidebar-border mt-12 pt-8 text-center text-sidebar-muted text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="flex items-center justify-center gap-1">
              © {new Date().getFullYear()} Umeed Child Foundation. Made with 
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
              </motion.span>
              for every child's dream.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
