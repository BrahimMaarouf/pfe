'use client'

import { Zap, Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t-2 border-foreground py-12 px-4 font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center shadow-lg shadow-foreground/60">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <span className="font-bold text-foreground">PNEUMO_AI</span>
            </div>
            <p className="text-sm text-foreground/70">
              Neural network medical diagnostics system with FDA-cleared accuracy.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-foreground mb-4">&gt; PRODUCT</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">FEATURES</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">PRICING</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">API_DOCS</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">DEVELOPERS</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4">&gt; COMPANY</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">ABOUT</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">BLOG</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">SECURITY</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">CONTACT</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-4">&gt; LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">PRIVACY</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">TERMS</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">COOKIES</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition">COMPLIANCE</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-foreground/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © 2024 PNEUMO_AI. FDA-CLEARED_MEDICAL_DEVICE.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground/60 hover:text-foreground transition hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
