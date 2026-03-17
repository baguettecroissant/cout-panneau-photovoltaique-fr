"use client";

import { useEffect, useRef } from "react";

export function ViteUnDevisWidget() {
    const loadedRef = useRef(false);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;

        const w = window as any;
        w.vud_partenaire_id = '2353';
        w.vud_categorie_id = '37';

        const vud_js = document.createElement('script');
        vud_js.type = 'text/javascript';
        vud_js.async = true;
        vud_js.src = '//www.viteundevis.com/f30f40bd7e/' + w.vud_partenaire_id + '/' + w.vud_categorie_id + '/';

        const s = document.getElementsByTagName('script')[0];
        if (s && s.parentNode) {
            s.parentNode.insertBefore(vud_js, s);
        }
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
            <div id="vf30f40bd7ed" className="min-h-[400px] flex items-center justify-center text-zinc-400">
                {/* ViteUnDevis widget loads here */}
            </div>
            <p className="text-center text-xs text-zinc-400 mt-2">
                Service gratuit et sans engagement
            </p>
        </div>
    );
}
