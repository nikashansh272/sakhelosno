import heroWardrobe from '../assets/images/hero_wardrobe_1794597698358.webp';
import heroWardrobe480 from '../assets/images/responsive/hero_wardrobe_1794597698358-480w.webp';
import heroWardrobe800 from '../assets/images/responsive/hero_wardrobe_1794597698358-800w.webp';

import heroBathroom from '../assets/images/hero_bathroom_1794597698246.webp';
import heroBathroom480 from '../assets/images/responsive/hero_bathroom_1794597698246-480w.webp';
import heroBathroom800 from '../assets/images/responsive/hero_bathroom_1794597698246-800w.webp';

import heroKitchen from '../assets/images/hero_kitchen_1794597699346.webp';
import heroKitchen480 from '../assets/images/responsive/hero_kitchen_1794597699346-480w.webp';
import heroKitchen800 from '../assets/images/responsive/hero_kitchen_1794597699346-800w.webp';

import aboutJoineryDetail from '../assets/images/about_joinery_detail_1794602821354.webp';
import aboutJoineryDetail480 from '../assets/images/responsive/about_joinery_detail_1794602821354-480w.webp';
import aboutJoineryDetail800 from '../assets/images/responsive/about_joinery_detail_1794602821354-800w.webp';

import sidebarCustomDetail from '../assets/images/sidebar_custom_detail_1794602822238.webp';
import sidebarCustomDetail480 from '../assets/images/responsive/sidebar_custom_detail_1794602822238-480w.webp';
import sidebarCustomDetail800 from '../assets/images/responsive/sidebar_custom_detail_1794602822238-800w.webp';

import twoPathCustomFitted from '../assets/images/twopath_custom_fitted_1794602823317.webp';
import twoPathCustomFitted480 from '../assets/images/responsive/twopath_custom_fitted_1794602823317-480w.webp';
import twoPathCustomFitted800 from '../assets/images/responsive/twopath_custom_fitted_1794602823317-800w.webp';

import catalogWardrobeOrbi from '../assets/images/catalog_wardrobe_orbi_1794597699531.webp';
import catalogWardrobeOrbi480 from '../assets/images/responsive/catalog_wardrobe_orbi_1794597699531-480w.webp';
import catalogWardrobeOrbi800 from '../assets/images/responsive/catalog_wardrobe_orbi_1794597699531-800w.webp';

import catalogWardrobeSavane from '../assets/images/catalog_wardrobe_savane_1794597700523.webp';
import catalogWardrobeSavane480 from '../assets/images/responsive/catalog_wardrobe_savane_1794597700523-480w.webp';
import catalogWardrobeSavane800 from '../assets/images/responsive/catalog_wardrobe_savane_1794597700523-800w.webp';

import catalogKitchenLine from '../assets/images/catalog_kitchen_line_1794597700615.webp';
import catalogKitchenLine480 from '../assets/images/responsive/catalog_kitchen_line_1794597700615-480w.webp';
import catalogKitchenLine800 from '../assets/images/responsive/catalog_kitchen_line_1794597700615-800w.webp';

import catalogVanityCompact from '../assets/images/catalog_vanity_compact_1794597700915.webp';
import catalogVanityCompact480 from '../assets/images/responsive/catalog_vanity_compact_1794597700915-480w.webp';
import catalogVanityCompact800 from '../assets/images/responsive/catalog_vanity_compact_1794597700915-800w.webp';

import catalogVanityMono from '../assets/images/catalog_vanity_mono_1794597700825.webp';
import catalogVanityMono480 from '../assets/images/responsive/catalog_vanity_mono_1794597700825-480w.webp';
import catalogVanityMono800 from '../assets/images/responsive/catalog_vanity_mono_1794597700825-800w.webp';

import catalogMirrorHalo from '../assets/images/catalog_mirror_halo_1794597701915.webp';
import catalogMirrorHalo480 from '../assets/images/responsive/catalog_mirror_halo_1794597701915-480w.webp';
import catalogMirrorHalo800 from '../assets/images/responsive/catalog_mirror_halo_1794597701915-800w.webp';

import catalogLampSena from '../assets/images/catalog_lamp_sena_1795347763591.webp';
import catalogLampSena480 from '../assets/images/responsive/catalog_lamp_sena_1795347763591-480w.webp';
import catalogLampSena800 from '../assets/images/responsive/catalog_lamp_sena_1795347763591-800w.webp';

import catalogLampLuma from '../assets/images/catalog_lamp_luma_1795347764585.webp';
import catalogLampLuma480 from '../assets/images/responsive/catalog_lamp_luma_1795347764585-480w.webp';
import catalogLampLuma800 from '../assets/images/responsive/catalog_lamp_luma_1795347764585-800w.webp';

import catalogTableKura from '../assets/images/catalog_table_kura_1795347764208.webp';
import catalogTableKura480 from '../assets/images/responsive/catalog_table_kura_1795347764208-480w.webp';
import catalogTableKura800 from '../assets/images/responsive/catalog_table_kura_1795347764208-800w.webp';

import catalogTableNori from '../assets/images/catalog_table_nori_1795347763529.webp';
import catalogTableNori480 from '../assets/images/responsive/catalog_table_nori_1795347763529-480w.webp';
import catalogTableNori800 from '../assets/images/responsive/catalog_table_nori_1795347763529-800w.webp';

import type { ResponsiveImageMeta } from '../types/site';

export const SITE_MEDIA = {
  heroWardrobe,
  heroBathroom,
  heroKitchen,
  aboutJoineryDetail,
  sidebarCustomDetail,
  twoPathCustomFitted,
  catalogWardrobeOrbi,
  catalogWardrobeSavane,
  catalogKitchenLine,
  catalogVanityCompact,
  catalogVanityMono,
  catalogMirrorHalo,
  catalogLampSena,
  catalogLampLuma,
  catalogTableKura,
  catalogTableNori,
} as const;

const RESPONSIVE_LOOKUP: Record<string, ResponsiveImageMeta> = {
  [heroWardrobe]: {
    src: heroWardrobe,
    srcSet: `${heroWardrobe480} 480w, ${heroWardrobe800} 800w, ${heroWardrobe} 1376w`,
    width: 1376,
    height: 768,
  },
  [heroBathroom]: {
    src: heroBathroom,
    srcSet: `${heroBathroom480} 480w, ${heroBathroom800} 800w, ${heroBathroom} 1376w`,
    width: 1376,
    height: 768,
  },
  [heroKitchen]: {
    src: heroKitchen,
    srcSet: `${heroKitchen480} 480w, ${heroKitchen800} 800w, ${heroKitchen} 1376w`,
    width: 1376,
    height: 768,
  },
  [aboutJoineryDetail]: {
    src: aboutJoineryDetail,
    srcSet: `${aboutJoineryDetail480} 480w, ${aboutJoineryDetail800} 800w, ${aboutJoineryDetail} 1376w`,
    width: 1376,
    height: 768,
  },
  [sidebarCustomDetail]: {
    src: sidebarCustomDetail,
    srcSet: `${sidebarCustomDetail480} 480w, ${sidebarCustomDetail800} 800w, ${sidebarCustomDetail} 1000w`,
    width: 1000,
    height: 747,
  },
  [twoPathCustomFitted]: {
    src: twoPathCustomFitted,
    srcSet: `${twoPathCustomFitted480} 480w, ${twoPathCustomFitted800} 800w, ${twoPathCustomFitted} 1376w`,
    width: 1376,
    height: 768,
  },
  [catalogWardrobeOrbi]: {
    src: catalogWardrobeOrbi,
    srcSet: `${catalogWardrobeOrbi480} 480w, ${catalogWardrobeOrbi800} 800w, ${catalogWardrobeOrbi} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogWardrobeSavane]: {
    src: catalogWardrobeSavane,
    srcSet: `${catalogWardrobeSavane480} 480w, ${catalogWardrobeSavane800} 800w, ${catalogWardrobeSavane} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogKitchenLine]: {
    src: catalogKitchenLine,
    srcSet: `${catalogKitchenLine480} 480w, ${catalogKitchenLine800} 800w, ${catalogKitchenLine} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogVanityCompact]: {
    src: catalogVanityCompact,
    srcSet: `${catalogVanityCompact480} 480w, ${catalogVanityCompact800} 800w, ${catalogVanityCompact} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogVanityMono]: {
    src: catalogVanityMono,
    srcSet: `${catalogVanityMono480} 480w, ${catalogVanityMono800} 800w, ${catalogVanityMono} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogMirrorHalo]: {
    src: catalogMirrorHalo,
    srcSet: `${catalogMirrorHalo480} 480w, ${catalogMirrorHalo800} 800w, ${catalogMirrorHalo} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogLampSena]: {
    src: catalogLampSena,
    srcSet: `${catalogLampSena480} 480w, ${catalogLampSena800} 800w, ${catalogLampSena} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogLampLuma]: {
    src: catalogLampLuma,
    srcSet: `${catalogLampLuma480} 480w, ${catalogLampLuma800} 800w, ${catalogLampLuma} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogTableKura]: {
    src: catalogTableKura,
    srcSet: `${catalogTableKura480} 480w, ${catalogTableKura800} 800w, ${catalogTableKura} 1000w`,
    width: 1000,
    height: 747,
  },
  [catalogTableNori]: {
    src: catalogTableNori,
    srcSet: `${catalogTableNori480} 480w, ${catalogTableNori800} 800w, ${catalogTableNori} 1000w`,
    width: 1000,
    height: 747,
  },
};

export function getResponsiveImage(src: string): ResponsiveImageMeta {
  return (
    RESPONSIVE_LOOKUP[src] ?? {
      src,
      srcSet: '',
      width: 1000,
      height: 747,
    }
  );
}
