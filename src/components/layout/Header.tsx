"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Menu, X, BookOpen, Award, HelpCircle, MapPin, Calculator } from "lucide-react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/simulateur-solaire", label: "Simulateur", icon: Calculator },
        { href: "/guides", label: "Guides", icon: BookOpen },
        { href: "/marques", label: "Marques", icon: Award },
        { href: "/annuaire", label: "Annuaire", icon: MapPin },
        { href: "/faq", label: "FAQ", icon: HelpCircle },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Sun className="h-7 w-7 text-amber-500" />
                    <span className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">
                        Cout-Panneau-Photovoltaique<span className="text-amber-600">.fr</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors"
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA + Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    <Link href="/devis" className="hidden sm:block">
                        <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white text-sm md:text-lg px-4 md:px-8 h-10 md:h-12 shadow-md hover:shadow-lg transition-all rounded-full">
                            <Sun className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Devis Gratuit
                        </Button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-amber-600 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                    <nav className="container mx-auto px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 p-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100">
                            <Link href="/devis" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-green-700 hover:bg-green-800 text-white h-12 rounded-full">
                                    <Sun className="mr-2 h-5 w-5" />
                                    Devis Gratuit
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
