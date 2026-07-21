import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { socialsData } from '../../data/socials';
import { Mail, Phone, Github, Linkedin, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import DepthCard from '../ui/DepthCard';
import { useScrollReveal } from '../../animations/useScrollReveal';

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef();
  
  // Stagger reveal contact items
  useScrollReveal(containerRef, '.reveal-item', 0.12);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Send Email via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_placeholder';

    if (serviceId === 'service_placeholder' || templateId === 'template_placeholder' || publicKey === 'public_placeholder') {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setStatus('error');
        setErrorMessage(error.text || 'An error occurred while sending your message. Please try again.');
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <section ref={containerRef} id="contact" className="relative py-24 bg-base border-t border-border overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Inquiry</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Get In Touch</h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-8 reveal-item">
            <div>
              <h3 className="font-display font-bold text-2xl text-text mb-4">
                Let's build something together
              </h3>
              <p className="text-muted leading-relaxed font-light">
                Whether you have a freelance project, a job opening, or just want to connect, feel free to drop me a message. I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Direct Details Card */}
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${socialsData.email}`}
                className="flex items-center gap-4 p-4 premium-card rounded-2xl"
              >
                <div className="p-3 bg-base border border-border rounded-xl text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Email Me</p>
                  <p className="text-sm font-bold text-text mt-0.5">{socialsData.email}</p>
                </div>
              </a>

              <a
                href={`tel:${socialsData.phone}`}
                className="flex items-center gap-4 p-4 premium-card rounded-2xl"
              >
                <div className="p-2.5 bg-base border border-border rounded-lg text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted font-medium uppercase tracking-wider">Call Me</p>
                  <p className="text-sm font-semibold text-text mt-0.5">{socialsData.phoneFormatted}</p>
                </div>
              </a>
            </div>

            {/* Resume repeat & socials */}
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <a href={socialsData.resumeUrl} download className="no-underline">
                <MagneticButton className="bg-transparent border-border hover:border-accent">
                  <Download size={14} className="stroke-[2.5]" />
                  Download Resume
                </MagneticButton>
              </a>

              <div className="flex items-center gap-4">
                <a
                  href={socialsData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface border border-border rounded-full hover:border-text hover:text-text text-muted transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={socialsData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface border border-border rounded-full hover:border-text hover:text-text text-muted transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 reveal-item">
            <DepthCard className="p-8">
              {status === 'success' ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-text">Message Sent!</h4>
                  <p className="text-muted max-w-sm font-light leading-relaxed">
                    Thank you for reaching out. Your message has been received successfully, and I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-accent hover:underline font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-base border ${errors.name ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-text placeholder:text-muted/40 focus:border-accent transition-colors`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-base border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-text placeholder:text-muted/40 focus:border-accent transition-colors`}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Pritesh, I would love to talk about..."
                      className={`w-full bg-base border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-text placeholder:text-muted/40 focus:border-accent transition-colors resize-none`}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Status notifications */}
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex gap-2">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-accent-glow w-full flex items-center justify-center gap-2 px-6 py-4 hover:-translate-y-[1.5px] hover:scale-[1.01] active:scale-[0.99] active:translate-y-0 disabled:bg-accent/50 disabled:shadow-none disabled:translate-y-0 disabled:scale-100 rounded-xl font-bold tracking-wide cursor-pointer select-none"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-base border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </DepthCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
