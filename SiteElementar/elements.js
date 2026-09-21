const elements = [
  {
    n: 1, s: "H", name: "Hidrogênio",
    type: "nonmetal", col: 1, row: 1,
    family: "Não metal", state: "Gasoso",
    where: "Presente na água e em muitas moléculas.",
    fact: "É o elemento mais abundante do Universo."
  },
  {
    n: 2, s: "He", name: "Hélio",
    type: "noble", col: 18, row: 1,
    family: "Gás nobre", state: "Gasoso",
    where: "Usado em balões e em sistemas criogênicos.",
    fact: "É um gás nobre."
  },
  {
    n: 3, s: "Li", name: "Lítio",
    type: "alkali", col: 1, row: 2,
    family: "Metal alcalino", state: "Sólido",
    where: "Usado em baterias recarregáveis.",
    fact: "É um metal alcalino."
  },
  {
    n: 4, s: "Be", name: "Berílio",
    type: "alkaline", col: 2, row: 2,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Metal leve usado em ligas especiais.",
    fact: "Pertence aos metais alcalino-terrosos."
  },
  {
    n: 5, s: "B", name: "Boro",
    type: "metalloid", col: 13, row: 2,
    family: "Metaloide", state: "Sólido",
    where: "Usado em vidros borossilicatos.",
    fact: "Possui propriedades intermediárias entre metais e não metais."
  },
  {
    n: 6, s: "C", name: "Carbono",
    type: "nonmetal", col: 14, row: 2,
    family: "Não metal", state: "Sólido",
    where: "Presente em todos os seres vivos conhecidos.",
    fact: "Pode formar materiais como grafite e diamante."
  },
  {
    n: 7, s: "N", name: "Nitrogênio",
    type: "nonmetal", col: 15, row: 2,
    family: "Não metal", state: "Gasoso",
    where: "Compõe a maior parte da atmosfera terrestre.",
    fact: "É importante para proteínas e ácidos nucleicos."
  },
  {
    n: 8, s: "O", name: "Oxigênio",
    type: "nonmetal", col: 16, row: 2,
    family: "Não metal", state: "Gasoso",
    where: "Está presente no ar e na água.",
    fact: "É essencial à respiração de muitos seres vivos."
  },
  {
    n: 9, s: "F", name: "Flúor",
    type: "halogen", col: 17, row: 2,
    family: "Halogênio", state: "Gasoso",
    where: "Compostos fluorados são usados em cuidados dentários.",
    fact: "É o elemento mais eletronegativo."
  },
  {
    n: 10, s: "Ne", name: "Neônio",
    type: "noble", col: 18, row: 2,
    family: "Gás nobre", state: "Gasoso",
    where: "Usado em letreiros luminosos.",
    fact: "Em certas lâmpadas, emite luz avermelhada."
  },
  {
    n: 11, s: "Na", name: "Sódio",
    type: "alkali", col: 1, row: 3,
    family: "Metal alcalino", state: "Sólido",
    where: "Seus compostos são comuns no sal de cozinha.",
    fact: "É um metal muito reativo."
  },
  {
    n: 12, s: "Mg", name: "Magnésio",
    type: "alkaline", col: 2, row: 3,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Presente em ligas leves e em processos biológicos.",
    fact: "É importante para o funcionamento de organismos."
  },
  {
    n: 13, s: "Al", name: "Alumínio",
    type: "other", col: 13, row: 3,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em embalagens, transportes e construções.",
    fact: "É relativamente leve e resistente à corrosão."
  },
  {
    n: 14, s: "Si", name: "Silício",
    type: "metalloid", col: 14, row: 3,
    family: "Metaloide", state: "Sólido",
    where: "Fundamental na fabricação de componentes eletrônicos.",
    fact: "É um dos principais componentes da crosta terrestre."
  },
  {
    n: 15, s: "P", name: "Fósforo",
    type: "nonmetal", col: 15, row: 3,
    family: "Não metal", state: "Sólido",
    where: "Presente em moléculas biológicas e fertilizantes.",
    fact: "É essencial aos seres vivos."
  },
  {
    n: 16, s: "S", name: "Enxofre",
    type: "nonmetal", col: 16, row: 3,
    family: "Não metal", state: "Sólido",
    where: "Usado na produção de ácido sulfúrico e fertilizantes.",
    fact: "É um não metal."
  },
  {
    n: 17, s: "Cl", name: "Cloro",
    type: "halogen", col: 17, row: 3,
    family: "Halogênio", state: "Gasoso",
    where: "Compostos de cloro são usados na desinfecção da água.",
    fact: "É um halogênio bastante reativo."
  },
  {
    n: 18, s: "Ar", name: "Argônio",
    type: "noble", col: 18, row: 3,
    family: "Gás nobre", state: "Gasoso",
    where: "Usado em atmosferas protetoras e lâmpadas.",
    fact: "É um gás nobre pouco reativo."
  },
  {
    n: 19, s: "K", name: "Potássio",
    type: "alkali", col: 1, row: 4,
    family: "Metal alcalino", state: "Sólido",
    where: "Importante para funções celulares.",
    fact: "Reage intensamente com água."
  },
  {
    n: 20, s: "Ca", name: "Cálcio",
    type: "alkaline", col: 2, row: 4,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Componente importante de ossos e dentes.",
    fact: "É essencial para diversas funções do organismo."
  },
  {
    n: 21, s: "Sc", name: "Escândio",
    type: "other", col: 3, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em algumas ligas de alumínio.",
    fact: "Pertence ao grupo dos metais de transição."
  },
  {
    n: 22, s: "Ti", name: "Titânio",
    type: "other", col: 4, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas resistentes e leves e em implantes.",
    fact: "Apresenta elevada resistência à corrosão."
  },
  {
    n: 23, s: "V", name: "Vanádio",
    type: "other", col: 5, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Adicionado a algumas ligas de aço.",
    fact: "Pode melhorar propriedades de ligas metálicas."
  },
  {
    n: 24, s: "Cr", name: "Cromo",
    type: "other", col: 6, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em aço inoxidável e revestimentos.",
    fact: "Seus compostos podem apresentar cores variadas."
  },
  {
    n: 25, s: "Mn", name: "Manganês",
    type: "other", col: 7, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado na produção de aço e em pilhas.",
    fact: "Também é um micronutriente essencial."
  },
  {
    n: 26, s: "Fe", name: "Ferro",
    type: "other", col: 8, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Principal componente do aço.",
    fact: "Está presente na hemoglobina do sangue."
  },
  {
    n: 27, s: "Co", name: "Cobalto",
    type: "other", col: 9, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas e materiais para baterias.",
    fact: "É componente da vitamina B12."
  },
  {
    n: 28, s: "Ni", name: "Níquel",
    type: "other", col: 10, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas resistentes à corrosão.",
    fact: "Também é utilizado em alguns tipos de bateria."
  },
  {
    n: 29, s: "Cu", name: "Cobre",
    type: "other", col: 11, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Muito usado em fios e cabos elétricos.",
    fact: "É um excelente condutor de eletricidade."
  },
  {
    n: 30, s: "Zn", name: "Zinco",
    type: "other", col: 12, row: 4,
    family: "Metal de transição", state: "Sólido",
    where: "Usado para proteger o aço contra corrosão.",
    fact: "É necessário em pequenas quantidades ao organismo."
  },
  {
    n: 31, s: "Ga", name: "Gálio",
    type: "other", col: 13, row: 4,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em semicondutores.",
    fact: "Seu ponto de fusão fica próximo da temperatura ambiente."
  },
  {
    n: 32, s: "Ge", name: "Germânio",
    type: "metalloid", col: 14, row: 4,
    family: "Metaloide", state: "Sólido",
    where: "Usado em aplicações eletrônicas e ópticas.",
    fact: "É um material semicondutor."
  },
  {
    n: 33, s: "As", name: "Arsênio",
    type: "metalloid", col: 15, row: 4,
    family: "Metaloide", state: "Sólido",
    where: "Utilizado em algumas aplicações industriais controladas.",
    fact: "Muitas de suas formas e compostos são tóxicos."
  },
  {
    n: 34, s: "Se", name: "Selênio",
    type: "nonmetal", col: 16, row: 4,
    family: "Não metal", state: "Sólido",
    where: "Usado em eletrônica e na fabricação de vidro.",
    fact: "É necessário em pequenas quantidades aos seres vivos."
  },
  {
    n: 35, s: "Br", name: "Bromo",
    type: "halogen", col: 17, row: 4,
    family: "Halogênio", state: "Líquido",
    where: "Seus compostos têm usos industriais variados.",
    fact: "É um dos poucos elementos líquidos à temperatura ambiente."
  },
  {
    n: 36, s: "Kr", name: "Criptônio",
    type: "noble", col: 18, row: 4,
    family: "Gás nobre", state: "Gasoso",
    where: "Usado em algumas lâmpadas e lasers.",
    fact: "É um gás nobre."
  },
  {
    n: 37, s: "Rb", name: "Rubídio",
    type: "alkali", col: 1, row: 5,
    family: "Metal alcalino", state: "Sólido",
    where: "Usado em pesquisa e em relógios atômicos.",
    fact: "É um metal alcalino muito reativo."
  },
  {
    n: 38, s: "Sr", name: "Estrôncio",
    type: "alkaline", col: 2, row: 5,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Compostos de estrôncio podem produzir cor vermelha em chamas.",
    fact: "Pertence aos metais alcalino-terrosos."
  },
  {
    n: 39, s: "Y", name: "Ítrio",
    type: "other", col: 3, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em fósforos e materiais cerâmicos.",
    fact: "É frequentemente associado aos elementos terras-raras."
  },
  {
    n: 40, s: "Zr", name: "Zircônio",
    type: "other", col: 4, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em revestimentos e aplicações nucleares.",
    fact: "Apresenta boa resistência à corrosão."
  },
  {
    n: 41, s: "Nb", name: "Nióbio",
    type: "other", col: 5, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas especiais e supercondutores.",
    fact: "Pode aumentar a resistência de ligas metálicas."
  },
  {
    n: 42, s: "Mo", name: "Molibdênio",
    type: "other", col: 6, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado na fabricação de aços especiais.",
    fact: "Ajuda ligas metálicas a resistirem a altas temperaturas."
  },
  {
    n: 43, s: "Tc", name: "Tecnécio",
    type: "other", col: 7, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em exames de medicina nuclear.",
    fact: "É um elemento radioativo."
  },
  {
    n: 44, s: "Ru", name: "Rutênio",
    type: "other", col: 8, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em catalisadores e ligas metálicas.",
    fact: "Pertence ao grupo da platina."
  },
  {
    n: 45, s: "Rh", name: "Ródio",
    type: "other", col: 9, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em catalisadores automotivos.",
    fact: "É um metal raro e resistente à corrosão."
  },
  {
    n: 46, s: "Pd", name: "Paládio",
    type: "other", col: 10, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em catalisadores e componentes eletrônicos.",
    fact: "Também pertence ao grupo da platina."
  },
  {
    n: 47, s: "Ag", name: "Prata",
    type: "other", col: 11, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usada em joias, contatos e componentes elétricos.",
    fact: "É um dos melhores condutores elétricos."
  },
  {
    n: 48, s: "Cd", name: "Cádmio",
    type: "other", col: 12, row: 5,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em algumas aplicações industriais e baterias.",
    fact: "É tóxico e seu uso é restrito em várias aplicações."
  },
  {
    n: 49, s: "In", name: "Índio",
    type: "other", col: 13, row: 5,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em telas e revestimentos condutores.",
    fact: "É relativamente macio."
  },
  {
    n: 50, s: "Sn", name: "Estanho",
    type: "other", col: 14, row: 5,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em soldas e revestimentos metálicos.",
    fact: "É um dos componentes comuns do bronze, junto ao cobre."
  },
  {
    n: 51, s: "Sb", name: "Antimônio",
    type: "metalloid", col: 15, row: 5,
    family: "Metaloide", state: "Sólido",
    where: "Usado em ligas e alguns materiais industriais.",
    fact: "Apresenta propriedades intermediárias entre metais e não metais."
  },
  {
    n: 52, s: "Te", name: "Telúrio",
    type: "metalloid", col: 16, row: 5,
    family: "Metaloide", state: "Sólido",
    where: "Usado em materiais semicondutores e termoelétricos.",
    fact: "É relativamente raro na crosta terrestre."
  },
  {
    n: 53, s: "I", name: "Iodo",
    type: "halogen", col: 17, row: 5,
    family: "Halogênio", state: "Sólido",
    where: "Usado em antissépticos e em compostos importantes à saúde.",
    fact: "É necessário em pequenas quantidades para a tireoide."
  },
  {
    n: 54, s: "Xe", name: "Xenônio",
    type: "noble", col: 18, row: 5,
    family: "Gás nobre", state: "Gasoso",
    where: "Usado em flashes, lâmpadas e aplicações especializadas.",
    fact: "Embora pouco reativo, pode formar alguns compostos."
  },
  {
    n: 55, s: "Cs", name: "Césio",
    type: "alkali", col: 1, row: 6,
    family: "Metal alcalino", state: "Sólido",
    where: "Usado em relógios atômicos e pesquisas.",
    fact: "É extremamente reativo."
  },
  {
    n: 56, s: "Ba", name: "Bário",
    type: "alkaline", col: 2, row: 6,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Compostos específicos são usados em exames radiológicos.",
    fact: "O bário metálico é bastante reativo."
  },
  {
    n: 57, s: "La", name: "Lantânio",
    type: "other", col: 3, row: 6,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em lentes especiais e baterias.",
    fact: "Dá nome à série dos lantanídeos."
  },
  {
    n: 58, s: "Ce", name: "Cério",
    type: "other", col: 3, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em catalisadores e no polimento de vidro.",
    fact: "É um dos lantanídeos mais abundantes."
  },
  {
    n: 59, s: "Pr", name: "Praseodímio",
    type: "other", col: 4, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em ímãs, ligas e materiais especiais.",
    fact: "Seus compostos podem apresentar coloração verde."
  },
  {
    n: 60, s: "Nd", name: "Neodímio",
    type: "other", col: 5, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado na fabricação de ímãs permanentes potentes.",
    fact: "Seus ímãs são utilizados em motores e fones de ouvido."
  },
  {
    n: 61, s: "Pm", name: "Promécio",
    type: "other", col: 6, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em pesquisas e aplicações especializadas.",
    fact: "Não possui isótopos estáveis."
  },
  {
    n: 62, s: "Sm", name: "Samário",
    type: "other", col: 7, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em ímãs e pesquisas nucleares.",
    fact: "Pode ser empregado em ímãs resistentes a altas temperaturas."
  },
  {
    n: 63, s: "Eu", name: "Európio",
    type: "other", col: 8, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em fósforos de telas e iluminação.",
    fact: "Seus compostos podem produzir emissão de luz vermelha."
  },
  {
    n: 64, s: "Gd", name: "Gadolínio",
    type: "other", col: 9, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Compostos são usados como agentes de contraste em exames médicos.",
    fact: "Possui propriedades magnéticas importantes."
  },
  {
    n: 65, s: "Tb", name: "Térbio",
    type: "other", col: 10, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em fósforos e materiais especiais.",
    fact: "Pode contribuir para a emissão de luz verde em telas."
  },
  {
    n: 66, s: "Dy", name: "Disprósio",
    type: "other", col: 11, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em ímãs de alto desempenho.",
    fact: "Pode ajudar ímãs a manterem suas propriedades em temperaturas elevadas."
  },
  {
    n: 67, s: "Ho", name: "Hólmio",
    type: "other", col: 12, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em lasers e pesquisas.",
    fact: "Apresenta propriedades magnéticas marcantes."
  },
  {
    n: 68, s: "Er", name: "Érbio",
    type: "other", col: 13, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em fibras ópticas e lasers.",
    fact: "É importante em tecnologias de comunicação por fibra óptica."
  },
  {
    n: 69, s: "Tm", name: "Túlio",
    type: "other", col: 14, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em alguns lasers e fontes especializadas.",
    fact: "É um dos lantanídeos menos abundantes."
  },
  {
    n: 70, s: "Yb", name: "Itérbio",
    type: "other", col: 15, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em lasers e pesquisas científicas.",
    fact: "Alguns de seus isótopos são estudados em relógios atômicos."
  },
  {
    n: 71, s: "Lu", name: "Lutécio",
    type: "other", col: 16, row: 8,
    family: "Lantanídeo", state: "Sólido",
    where: "Usado em detectores e aplicações especializadas.",
    fact: "É um dos lantanídeos mais densos."
  },
  {
    n: 72, s: "Hf", name: "Háfnio",
    type: "other", col: 4, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas resistentes ao calor e em tecnologia nuclear.",
    fact: "É quimicamente semelhante ao zircônio."
  },
  {
    n: 73, s: "Ta", name: "Tântalo",
    type: "other", col: 5, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em componentes eletrônicos e equipamentos resistentes à corrosão.",
    fact: "É utilizado em capacitores eletrônicos."
  },
  {
    n: 74, s: "W", name: "Tungstênio",
    type: "other", col: 6, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ferramentas e ligas para altas temperaturas.",
    fact: "Possui o maior ponto de fusão entre os metais puros."
  },
  {
    n: 75, s: "Re", name: "Rênio",
    type: "other", col: 7, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em superligas para altas temperaturas.",
    fact: "É um elemento raro na crosta terrestre."
  },
  {
    n: 76, s: "Os", name: "Ósmio",
    type: "other", col: 8, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em ligas e aplicações especializadas.",
    fact: "É um dos elementos mais densos conhecidos."
  },
  {
    n: 77, s: "Ir", name: "Irídio",
    type: "other", col: 9, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em equipamentos e aplicações especializadas.",
    fact: "É muito resistente à corrosão."
  },
  {
    n: 78, s: "Pt", name: "Platina",
    type: "other", col: 10, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usada em joalheria e catalisadores.",
    fact: "Pode acelerar reações químicas sem ser consumida nelas."
  },
  {
    n: 79, s: "Au", name: "Ouro",
    type: "other", col: 11, row: 6,
    family: "Metal de transição", state: "Sólido",
    where: "Usado em joalheria e componentes eletrônicos.",
    fact: "É maleável e apresenta boa resistência à corrosão."
  },
  {
    n: 80, s: "Hg", name: "Mercúrio",
    type: "other", col: 12, row: 6,
    family: "Metal de transição", state: "Líquido",
    where: "Já foi muito usado em instrumentos de medição; hoje seu uso é restrito.",
    fact: "É um metal líquido à temperatura ambiente e é tóxico."
  },
    {
    n: 81, s: "Tl", name: "Tálio",
    type: "other", col: 13, row: 6,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em algumas aplicações eletrônicas e ópticas especializadas.",
    fact: "É um elemento tóxico."
  },
  {
    n: 82, s: "Pb", name: "Chumbo",
    type: "other", col: 14, row: 6,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em baterias e em proteção contra radiação.",
    fact: "É um metal denso e tóxico."
  },
  {
    n: 83, s: "Bi", name: "Bismuto",
    type: "other", col: 15, row: 6,
    family: "Metal pós-transição", state: "Sólido",
    where: "Usado em ligas e em alguns medicamentos.",
    fact: "É um metal relativamente pouco tóxico em comparação com outros metais pesados."
  },
  {
    n: 84, s: "Po", name: "Polônio",
    type: "metalloid", col: 16, row: 6,
    family: "Metaloide", state: "Sólido",
    where: "Pesquisado em aplicações científicas especializadas.",
    fact: "É um elemento radioativo."
  },
  {
    n: 85, s: "At", name: "Astato",
    type: "halogen", col: 17, row: 6,
    family: "Halogênio", state: "Sólido (previsto)",
    where: "É estudado em pesquisas científicas, inclusive sobre aplicações médicas.",
    fact: "É extremamente raro e radioativo."
  },
  {
    n: 86, s: "Rn", name: "Radônio",
    type: "noble", col: 18, row: 6,
    family: "Gás nobre", state: "Gasoso",
    where: "Pode ser encontrado naturalmente em algumas rochas e solos.",
    fact: "É um gás radioativo."
  },
  {
    n: 87, s: "Fr", name: "Frâncio",
    type: "alkali", col: 1, row: 7,
    family: "Metal alcalino", state: "Sólido (previsto)",
    where: "Encontrado em quantidades minúsculas em cadeias de decaimento radioativo.",
    fact: "É extremamente raro e radioativo."
  },
  {
    n: 88, s: "Ra", name: "Rádio",
    type: "alkaline", col: 2, row: 7,
    family: "Metal alcalino-terroso", state: "Sólido",
    where: "Elemento radioativo encontrado em minérios de urânio.",
    fact: "Foi estudado historicamente por sua radioatividade."
  },
  {
    n: 89, s: "Ac", name: "Actínio",
    type: "other", col: 3, row: 7,
    family: "Actinídeo", state: "Sólido",
    where: "Usado em pesquisas sobre radioatividade.",
    fact: "Dá nome à série dos actinídeos."
  },
  {
    n: 90, s: "Th", name: "Tório",
    type: "other", col: 3, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Estudado como possível combustível para tecnologias nucleares.",
    fact: "É um elemento radioativo."
  },
  {
    n: 91, s: "Pa", name: "Protactínio",
    type: "other", col: 4, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Utilizado principalmente em pesquisas científicas.",
    fact: "É raro e radioativo."
  },
  {
    n: 92, s: "U", name: "Urânio",
    type: "other", col: 5, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Utilizado como combustível em reatores nucleares.",
    fact: "É um elemento radioativo encontrado naturalmente na crosta terrestre."
  },
  {
    n: 93, s: "Np", name: "Netúnio",
    type: "other", col: 6, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Produzido principalmente em reatores e estudado em pesquisas nucleares.",
    fact: "Foi o primeiro elemento transurânico descoberto."
  },
  {
    n: 94, s: "Pu", name: "Plutônio",
    type: "other", col: 7, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Utilizado em aplicações nucleares controladas.",
    fact: "É um elemento radioativo."
  },
  {
    n: 95, s: "Am", name: "Amerício",
    type: "other", col: 8, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Usado em alguns detectores de fumaça.",
    fact: "É um elemento sintético e radioativo."
  },
  {
    n: 96, s: "Cm", name: "Cúrio",
    type: "other", col: 9, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Utilizado principalmente em pesquisas científicas.",
    fact: "Seu nome homenageia Marie e Pierre Curie."
  },
  {
    n: 97, s: "Bk", name: "Berquélio",
    type: "other", col: 10, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Produzido e estudado em laboratórios especializados.",
    fact: "Seu nome homenageia a cidade de Berkeley."
  },
  {
    n: 98, s: "Cf", name: "Califórnio",
    type: "other", col: 11, row: 9,
    family: "Actinídeo", state: "Sólido",
    where: "Usado como fonte de nêutrons em aplicações especializadas.",
    fact: "Seu nome homenageia a Califórnia."
  },
  {
    n: 99, s: "Es", name: "Einstênio",
    type: "other", col: 12, row: 9,
    family: "Actinídeo", state: "Sólido (previsto)",
    where: "Produzido em pequenas quantidades para pesquisas.",
    fact: "Seu nome homenageia Albert Einstein."
  },
  {
    n: 100, s: "Fm", name: "Férmio",
    type: "other", col: 13, row: 9,
    family: "Actinídeo", state: "Sólido (previsto)",
    where: "Produzido em laboratórios para pesquisas científicas.",
    fact: "Seu nome homenageia Enrico Fermi."
  },
  {
    n: 101, s: "Md", name: "Mendelévio",
    type: "other", col: 14, row: 9,
    family: "Actinídeo", state: "Sólido (previsto)",
    where: "Produzido em pequenas quantidades em laboratórios.",
    fact: "Seu nome homenageia Dmitri Mendeleev."
  },
  {
    n: 102, s: "No", name: "Nobélio",
    type: "other", col: 15, row: 9,
    family: "Actinídeo", state: "Sólido (previsto)",
    where: "Produzido para pesquisas científicas.",
    fact: "Seu nome homenageia Alfred Nobel."
  },
  {
    n: 103, s: "Lr", name: "Laurêncio",
    type: "other", col: 16, row: 9,
    family: "Actinídeo", state: "Sólido (previsto)",
    where: "Produzido em laboratórios especializados.",
    fact: "Seu nome homenageia Ernest Lawrence."
  },
  {
    n: 104, s: "Rf", name: "Rutherfórdio",
    type: "other", col: 4, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "É um elemento sintético e altamente radioativo."
  },
  {
    n: 105, s: "Db", name: "Dúbnio",
    type: "other", col: 5, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Suas propriedades são difíceis de estudar devido à sua curta duração."
  },
  {
    n: 106, s: "Sg", name: "Seabórgio",
    type: "other", col: 6, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia Glenn T. Seaborg."
  },
  {
    n: 107, s: "Bh", name: "Bóhrio",
    type: "other", col: 7, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia Niels Bohr."
  },
  {
    n: 108, s: "Hs", name: "Hássio",
    type: "other", col: 8, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome deriva de Hesse, região da Alemanha."
  },
  {
    n: 109, s: "Mt", name: "Meitnério",
    type: "other", col: 9, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia Lise Meitner."
  },
  {
    n: 110, s: "Ds", name: "Darmstádtio",
    type: "other", col: 10, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia a cidade de Darmstadt."
  },
  {
    n: 111, s: "Rg", name: "Roentgênio",
    type: "other", col: 11, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia Wilhelm Röntgen."
  },
  {
    n: 112, s: "Cn", name: "Copernício",
    type: "other", col: 12, row: 7,
    family: "Metal de transição", state: "Desconhecido (previsto líquido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia Nicolau Copérnico."
  },
  {
    n: 113, s: "Nh", name: "Nihônio",
    type: "other", col: 13, row: 7,
    family: "Metal pós-transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome deriva de uma forma de dizer Japão em japonês."
  },
  {
    n: 114, s: "Fl", name: "Fleróvio",
    type: "other", col: 14, row: 7,
    family: "Metal pós-transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia o Laboratório Flerov."
  },
  {
    n: 115, s: "Mc", name: "Moscóvio",
    type: "other", col: 15, row: 7,
    family: "Metal pós-transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia a região de Moscou."
  },
  {
    n: 116, s: "Lv", name: "Livermório",
    type: "other", col: 16, row: 7,
    family: "Metal pós-transição", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia o Laboratório Nacional Lawrence Livermore."
  },
  {
    n: 117, s: "Ts", name: "Tenessino",
    type: "halogen", col: 17, row: 7,
    family: "Halogênio", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia o estado do Tennessee."
  },
  {
    n: 118, s: "Og", name: "Oganessônio",
    type: "noble", col: 18, row: 7,
    family: "Gás nobre", state: "Desconhecido (previsto sólido)",
    where: "Produzido artificialmente em laboratórios.",
    fact: "Seu nome homenageia o físico Yuri Oganessian."
  }
];

// ATUALIZA OS TIPOS DE CADA FAMÍLIA

const familyTypes = {
  "Metal alcalino": "alkali",
  "Metal alcalino-terroso": "alkaline",
  "Metal de transição": "transition",
  "Metal pós-transição": "post-transition",
  "Metaloide": "metalloid",
  "Não metal": "nonmetal",
  "Halogênio": "halogen",
  "Gás nobre": "noble",
  "Lantanídeo": "lanthanide",
  "Actinídeo": "actinide"
};

elements.forEach((el) => {
  if (familyTypes[el.family]) {
    el.type = familyTypes[el.family];
  }
});

window.elements = elements;