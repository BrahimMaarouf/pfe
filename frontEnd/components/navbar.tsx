'use client'

import { Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavbarProps {
  onDemoMode: (mode: 'normal' | 'pneumonia') => void
}

export default function Navbar({ onDemoMode }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center shadow-lg shadow-accent/50">
              <Zap className="w-6 h-6 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">PneumoAI</span>
              <span className="text-xs text-accent/80">Medical Diagnostics</span>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-foreground/70 hover:text-accent transition">Features</a>
            <a href="#" className="text-sm text-foreground/70 hover:text-accent transition">Accuracy</a>
            <a href="#" className="text-sm text-foreground/70 hover:text-accent transition">Security</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Demo Mode Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-secondary/50 border-accent/50 text-foreground hover:bg-accent/20 hover:text-accent"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Demo Mode
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-accent/30">
                <DropdownMenuItem
                  onClick={() => onDemoMode('normal')}
                  className="text-foreground hover:bg-accent/20 hover:text-accent cursor-pointer"
                >
                  Normal Result
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDemoMode('pneumonia')}
                  className="text-foreground hover:bg-accent/20 hover:text-accent cursor-pointer"
                >
                  Pneumonia Result
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button
              size="sm"
              className="bg-accent text-background hover:bg-primary shadow-lg shadow-accent/50 font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
