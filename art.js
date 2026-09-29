// Published artwork titles retain their original wording in both languages.
// Entries without a confirmed title use a descriptive label.
// Box coordinates are fractions of the room. The source files remain untouched.
// AP notes are edited summaries of Sofía’s 2022 submission, not verbatim quotes.
const apArtInvestigation = [
 'Mi investigación para AP Drawing comenzó con la maleabilidad de la memoria y se volvió cada vez más personal: cómo los recuerdos me han formado y cómo seguirán cambiándome. El puntillismo abstracto me permitió representar recuerdos claros pero imperfectos; los motivos recurrentes, expresar ideas más complejas.',
 'My AP Drawing investigation began with the malleability of memory and became increasingly personal: how memories have shaped me and how they will continue to change me. Abstract pointillism let me portray memories as clear but imperfect, while recurring motifs expressed more complex ideas.'
];
const apArtNoteSource = ['Notas adaptadas de mi portafolio AP Drawing · 2022.','Notes adapted from my AP Drawing portfolio · 2022.'];
window.NOCHE_ARTWORKS = [
 {id:'guitar', title:['Love Song With No Purpose','Love Song With No Purpose'], titleVerified:true, src:'assets/art/guitar.jpg',
  medium:['Gouache sobre madera · 24 × 18 pulgadas','Gouache on wood · 24 × 18 in'],
  description:['En la obra final de mi investigación, una guitarra sin cuerdas representa una canción de amor sin propósito después de una ruptura. Quise reunir las habilidades que había desarrollado durante el año en una oda a la nostalgia, la reflexión y la retrospección.','In the final piece of my investigation, a stringless guitar represents a love song with no purpose after a breakup. I wanted to bring together the skills I had developed throughout the year in an ode to nostalgia, reflection and retrospection.'],
  process:['Trabajé con gouache sobre un panel de madera, gesso y medio para veladuras. Reuní el puntillismo abstracto, los motivos recurrentes, el estudio de la fuente de luz y la igualación de colores, además de una revisión a fondo del concepto.','I worked with gouache on a wood panel, gesso and glazing medium. The piece brought together abstract pointillism, recurring motifs, attention to the light source and color matching, alongside extensive revision of the concept.'],
  context:apArtInvestigation, noteSource:apArtNoteSource,
  source:'https://www.instagram.com/sofirichof.art/p/CgMWDEJsVhL/',
  box:{x:.147,y:.03,w:.09,h:.193}, frame:'wood'},
 {id:'sphere', title:['Reflecting on time','Reflecting on time'], titleVerified:true, src:'assets/art/sphere.jpg',
  medium:['Gouache y acrílico sobre madera · 9 × 12 pulgadas','Gouache and acrylic on wood · 9 × 12 in'],
  description:['Quise representar de forma literal el acto de reflexionar sobre el tiempo y la memoria. Inspirada en Hand with Reflecting Sphere, de M. C. Escher, la obra reúne una mano, un espacio reflejado y el motivo recurrente del reloj.','I wanted to portray reflection and retrospection on time and memory in a literal sense. Inspired by M. C. Escher’s Hand with Reflecting Sphere, the work brings together a hand, a reflected room and the recurring clock motif.'],
  process:['Investigué a Escher y el surrealismo, tomé una fotografía de referencia y revisé la composición mediante estudios en pastel suave y bocetos a lápiz. Para la pintura trabajé con gouache, acrílico, gesso y medio para veladuras sobre madera, practicando la igualación de colores y los tonos de piel.','I researched Escher and surrealism, took a reference photograph and revised the composition through soft-pastel studies and pencil sketches. For the painting, I used gouache, acrylic, gesso and glazing medium on wood, practicing color matching and skin tones.'],
  context:apArtInvestigation, noteSource:apArtNoteSource,
  source:'https://www.instagram.com/sofirichof.art/p/Cc-pd5uOUV_/',
  box:{x:.263,y:.03,w:.086,h:.184}, frame:'dark'},
 {id:'pastel', title:['Retrato de perfil','Profile portrait'], titleVerified:false, src:'assets/art/pastel-profile.jpg',
  medium:['Pastel suave','Soft pastels'],
  description:['No sé por qué antes me daba tanto miedo el color; es muy divertido tener la libertad de hacer con los colores todo lo que quieras.','Don’t know why I was so scared of color before, it’s literally so much fun to be free with colors to do everything and anything you want.'],
  source:'https://www.instagram.com/sofirichof.art/p/CIbbaVIlME5/',
  box:{x:.148,y:.24,w:.074,h:.146}, frame:'wood'},
 {id:'si-solamente', title:['Si Solamente · diseño de cartel','Si Solamente · poster design'], src:'assets/art/si-solamente-poster.jpg',
  box:{x:.435,y:.03,w:.06,h:.144}, frame:'dark'}
];
window.NOCHE_MIRROR_PORTRAIT = {
 src:'assets/art/self-portrait.jpg', crop:{x:.133,y:.17,w:.743,h:.718},
 zoom:1.08, position:{x:.55,y:.5}
};
