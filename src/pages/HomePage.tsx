import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  BookOpen, 
  Users, 
  MapPin, 
  GraduationCap,
  Mail,
  Phone,
  Instagram,
  MessageCircle,
  ChevronRight,
  Star,
  Send,
  Loader2
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Thank you for joining us! 🎉",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">Umeed Child Foundation</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#what-we-do" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">What We Do</a>
              <a href="#locations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Locations</a>
              <a href="#join" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Join Us</a>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Every Sunday, we bring hope</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Umeed Child
              <span className="block text-primary">Foundation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Every Sunday, we bring hope through education
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Started by 3 friends • Teaching 65+ underprivileged children • 40+ dedicated volunteers • 2 locations in the city
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#join">
                <Button size="xl" className="w-full sm:w-auto">
                  <Heart className="w-5 h-5 mr-2" />
                  Join as Volunteer
                </Button>
              </a>
              <Link to="/login">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  Admin/Volunteer Login
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Story
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              How It All Began
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Umeed Child Foundation was started in 2023 by three friends who believed that no child should be denied education because of financial constraints. Every Sunday, our volunteers gather at two locations to teach 65+ children and give them hope for a brighter future.
            </motion.p>
          </motion.div>

          {/* Founders */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: 'Rohan Sharma', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
              { name: 'Priya Mehta', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face' },
              { name: 'Arjun Patel', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
            ].map((founder, index) => (
              <motion.div
                key={founder.name}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 mb-4">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                <p className="text-muted-foreground">{founder.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Impact
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2">
              Every Sunday, We Make a Difference
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BookOpen,
                title: 'Free Education',
                description: 'Academic support, life skills & personality development for every child',
                color: 'bg-primary/10 text-primary'
              },
              {
                icon: Users,
                title: '65+ Children',
                description: 'Currently reaching children from nearby slum communities every week',
                color: 'bg-secondary/10 text-secondary'
              },
              {
                icon: GraduationCap,
                title: '40+ Volunteers',
                description: 'Teachers, college students & working professionals giving back',
                color: 'bg-amber-500/10 text-amber-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Find Us
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2">
              Our Teaching Centers
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                name: 'Andheri East Center',
                address: 'Near XYZ School, Andheri East, Mumbai',
                timing: 'Every Sunday, 10:00 AM - 1:00 PM'
              },
              {
                name: 'Bandra West Center',
                address: 'Community Hall, Bandra West, Mumbai',
                timing: 'Every Sunday, 10:00 AM - 1:00 PM'
              }
            ].map((location, index) => (
              <motion.div
                key={location.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary/40" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{location.name}</h3>
                  <p className="text-muted-foreground mb-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" />
                    {location.address}
                  </p>
                  <p className="text-sm text-primary font-medium">{location.timing}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Make a Difference
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Become a Volunteer
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Gift a child hope. Join our family of 40+ volunteers today.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession / Student? *</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                    placeholder="e.g., Software Engineer / College Student"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location *</Label>
                <Select
                  value={formData.preferredLocation}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, preferredLocation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andheri">Andheri East</SelectItem>
                    <SelectItem value="bandra">Bandra West</SelectItem>
                    <SelectItem value="either">Either Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us why you want to volunteer..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
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
            </form>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Gallery
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2">
              Moments of Joy
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1529390079861-591f8f0e3c60?w=400&h=400&fit=crop',
            ].map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2">
              What People Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
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
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Umeed Child Foundation</span>
              </div>
              <p className="text-sidebar-muted mb-6 max-w-sm">
                Every Sunday, we bring hope through education. Join us in making a difference in children's lives.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sidebar-muted">
                <li><a href="#" className="hover:text-sidebar-foreground transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-sidebar-foreground transition-colors">About Us</a></li>
                <li><a href="#join" className="hover:text-sidebar-foreground transition-colors">Join Us</a></li>
                <li><Link to="/login" className="hover:text-sidebar-foreground transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sidebar-muted">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@umeedchild.org
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  Mumbai, Maharashtra, India
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sidebar-border mt-12 pt-8 text-center text-sidebar-muted text-sm">
            <p>© {new Date().getFullYear()} Umeed Child Foundation. Made with ❤️ for every child's dream.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
