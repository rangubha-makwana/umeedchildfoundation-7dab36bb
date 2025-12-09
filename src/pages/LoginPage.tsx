import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both email and password',
      });
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: result.error || 'Invalid credentials',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">Umeed Child</h1>
                <p className="text-primary-foreground/80">Foundation</p>
              </div>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
              Together, We Stand for Every Child's Dream
            </h2>
            
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Empowering underprivileged children through education and support. 
              Manage students, volunteers, and attendance all in one place.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold text-primary-foreground">100+</p>
                <p className="text-primary-foreground/80 text-sm">Students Impacted</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold text-primary-foreground">25+</p>
                <p className="text-primary-foreground/80 text-sm">Active Volunteers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Umeed Child Foundation</h1>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-muted rounded-xl">
            <p className="text-sm font-medium text-foreground mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium">Admin:</span> admin@umeed.org / admin123</p>
              <p><span className="font-medium">Coordinator:</span> coordinator@umeed.org / coord123</p>
              <p><span className="font-medium">Volunteer:</span> volunteer@umeed.org / vol123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
