import { PrismaClient, Role, EnquiryStatus, QuotationStatus, ApplicationStatus, DocumentCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // 1. Admin User
  const passwordHash = await bcrypt.hash("OakAfrica2026!Secure", 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@oaksafricagroup.com" },
    update: {},
    create: {
      name: "Oak Administrator",
      email: "admin@oaksafricagroup.com",
      passwordHash,
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`Admin user ensured: ${admin.email}`);

  // 2. Company Information
  const companyInfo = await prisma.companyInformation.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      companyName: "OAKS AFRICA GROUP",
      tagline: "Engineering Solutions. Lasting Impact.",
      overview:
        "OAKS AFRICA GROUP is a premier engineering, architectural design, and general construction enterprise headquartered in East Africa. We deliver world-class commercial developments, high-density residential towers, specialized industrial facilities, and large-scale public civil infrastructure. Built upon a bedrock of engineering precision, technical competence, and international safety compliance, we turn visionary master plans into durable, sustainable built environments.",
      history:
        "Founded by a consortium of seasoned structural engineers, architects, and infrastructure strategists, OAKS AFRICA GROUP was established to close the critical gap between visionary architectural concepts and rigorous, high-standard engineering execution across the continent. Over the past decade, our multidisciplinary team has engineered and delivered over 450,000 square meters of structural space, major transportation interchanges, and industrial facilities that drive economic growth.",
      vision:
        "To be Africa's benchmark engineering and construction group, globally recognized for technical excellence, uncompromised structural integrity, and transformative development.",
      mission:
        "To engineer, design, and deliver sustainable, resilient, and superior built environments through disciplined precision, ethical delivery, and enduring client partnerships.",
      coreValues: [
        {
          title: "Engineering Excellence",
          description:
            "Rigorous mathematical modeling, advanced materials science, and adherence to Eurocode and international structural standards.",
          icon: "ShieldCheck",
        },
        {
          title: "Uncompromising Integrity",
          description:
            "Transparent procurement, strict budgetary governance, and complete accountability across all project phases.",
          icon: "Scale",
        },
        {
          title: "Sustainable Innovation",
          description:
            "Integration of energy-efficient systems, green building certification standards (LEED/EDGE), and local material optimization.",
          icon: "Leaf",
        },
        {
          title: "Safety & Health Governance",
          description:
            "Zero-harm workplace philosophy with stringent HSE protocols, active hazard mitigation, and continuous team training.",
          icon: "HardHat",
        },
        {
          title: "Client Partnership",
          description:
            "Collaborative value engineering focused on life-cycle performance, economic viability, and exceeding client expectations.",
          icon: "Users2",
        },
      ],
      address: "Oaks Tower, 7th Floor, Bole Commercial Corridor",
      cityCountry: "Addis Ababa, Ethiopia",
      email: "info@oaksafricagroup.com",
      phone: "+251 91 123 4567",
      whatsapp: "+251911234567",
      businessHours: "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:30 AM - 1:00 PM",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.540114757672!2d38.789123!3d8.995432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f275e7a9%3A0x6b7724bc24bf8f6b!2sBole%20Rd%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set",
      linkedin: "https://linkedin.com/company/oaks-africa-group",
      twitter: "https://twitter.com/OaksAfricaGroup",
      facebook: "https://facebook.com/OaksAfricaGroup",
      instagram: "https://instagram.com/oaksafricagroup",
    },
  });
  console.log(`Company information seeded: ${companyInfo.companyName}`);

  // 3. Project Categories
  const categoriesData = [
    { name: "Commercial", slug: "commercial", description: "Corporate headquarters, financial centers, business towers, and mixed-use commercial developments." },
    { name: "Residential", slug: "residential", description: "High-density residential towers, luxury bespoke villas, and master-planned eco-estates." },
    { name: "Industrial", slug: "industrial", description: "Heavy manufacturing plants, logistics hubs, agro-processing facilities, and specialized warehouses." },
    { name: "Infrastructure", slug: "infrastructure", description: "Expressway interchanges, grade-separated bridges, municipal water treatment, and public civil works." },
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const record = await prisma.projectCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoriesMap[cat.slug] = record.id;
  }
  console.log("Project categories created.");

  // 4. Services (The 5 Core Categories)
  const servicesData = [
    {
      slug: "structural-civil-engineering",
      title: "Structural and Civil Engineering",
      shortDescription:
        "Comprehensive structural analysis, foundation engineering, seismic design, and civil infrastructure planning delivered to international engineering codes.",
      fullDescription:
        "OAKS AFRICA GROUP provides state-of-the-art structural and civil engineering solutions for high-rise commercial structures, complex deep basements, heavy industrial facilities, and public civil infrastructure. Utilizing advanced finite element analysis (FEA), Building Information Modeling (BIM), and performance-based seismic design, our engineering teams ensure that every structure satisfies the highest metrics of stability, load-bearing capacity, economic efficiency, and durability over its complete lifecycle.",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1920&q=80",
      iconName: "ShieldCheck",
      scope: [
        "Reinforced concrete and post-tensioned structural design",
        "Deep foundation engineering and contiguous pile retaining walls",
        "Structural steel framework design and connection engineering",
        "Seismic vulnerability assessments and structural retrofitting",
        "Civil drainage, grading, and storm-water management modeling",
        "Independent structural integrity audits and peer reviews",
      ],
      capabilities: [
        "BIM Level 2 Coordination (Revit, Tekla, Navisworks)",
        "Finite Element Stress Analysis (ETABS, SAP2000, SAFE)",
        "Eurocode, British Standards (BS), and ASTM Compliance",
        "Geotechnical Investigation Interpretation & Foundation Optimization",
      ],
      displayOrder: 1,
      published: true,
    },
    {
      slug: "architectural-engineering-design",
      title: "Architectural and Engineering Design",
      shortDescription:
        "Harmonizing bold contemporary architectural form with rigorous engineering functionality, spatial efficiency, and biophilic environmental design.",
      fullDescription:
        "Our integrated architectural and engineering design practice delivers visionary built environments that respond contextually to Africa's climate, culture, and urban future. We synthesize form, spatial fluidity, natural light modulation, and high-performance building skins with MEP (mechanical, electrical, plumbing) engineering to produce timeless, energy-efficient landmarks that command respect and enhance human well-being.",
      heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
      iconName: "PenTool",
      scope: [
        "Architectural concept design and master planning",
        "3D photo-realistic architectural visualization and VR walk-throughs",
        "Façade engineering and climatic solar-shading optimization",
        "MEP (Mechanical, Electrical, and Plumbing) engineering design",
        "Sustainable design benchmarking (EDGE, LEED rating systems)",
        "Detailed construction documentation and statutory permit procurement",
      ],
      capabilities: [
        "Computational Design & Parametric Façade Engineering",
        "Daylight and Thermal Energy Simulation Modeling",
        "Acoustic and Fire Life-Safety Engineering Integration",
        "Urban Master Planning & Site Logistics Optimization",
      ],
      displayOrder: 2,
      published: true,
    },
    {
      slug: "building-construction",
      title: "Building and General Construction",
      shortDescription:
        "Full-scope general contracting, precision structural execution, high-grade architectural finishes, and turn-key commercial and residential delivery.",
      fullDescription:
        "As a principal building contractor, OAKS AFRICA GROUP executes complex commercial, institutional, and residential building projects with uncompromising craftsmanship and military project discipline. We manage self-performed structural works, subcontracted specialist installations, site logistics, and health and safety with an unyielding commitment to finish quality, program milestones, and contractual budget caps.",
      heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
      iconName: "Building2",
      scope: [
        "Turnkey general contracting and design-build delivery",
        "High-rise core and shell concrete construction",
        "Curtain walling, structural glazing, and architectural cladding",
        "Interior architectural fit-out and acoustic ceiling installations",
        "Heavy MEP plant equipment erection and commissioning",
        "Site safety governance, crane logistics, and quality assurance testing",
      ],
      capabilities: [
        "In-house concrete batching quality oversight & cube compressive testing",
        "Precision post-tensioning and prefabricated steel assembly",
        "Integrated site HSE management under ISO 45001 standards",
        "Comprehensive defects liability and commissioning management",
      ],
      displayOrder: 3,
      published: true,
    },
    {
      slug: "infrastructure-development",
      title: "Infrastructure Development",
      shortDescription:
        "Engineering transformative transportation corridors, bridges, storm-water arterial systems, and industrial utility infrastructure.",
      fullDescription:
        "Africa's rapid urban transition demands robust, high-capacity infrastructure. OAKS AFRICA GROUP undertakes civil infrastructure works including grade-separated expressway interchanges, pre-stressed bridge structures, heavy-duty industrial pavements, and municipal hydraulic systems. Our engineering methodology integrates earthwork mass-haul balancing, advanced asphalt and concrete mix designs, and climate-resilient flood mitigation.",
      heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1920&q=80",
      iconName: "Layers",
      scope: [
        "Highways, arterial roads, and multi-lane expressways",
        "Grade-separated overpasses, flyovers, and box-girder bridges",
        "Mass earthworks, slope stabilization, and soil nailing",
        "Municipal water supply, trunk mains, and drainage culverts",
        "Heavy-load industrial concrete aprons and container yards",
        "Environmental impact mitigation and community traffic routing",
      ],
      capabilities: [
        "GPS-guided earthmoving plant and compaction automation",
        "Geotechnical ground improvement and geosynthetic reinforcement",
        "Hydrologic watershed analysis and stormwater modeling",
        "Heavy transport structural bridge load rating",
      ],
      displayOrder: 4,
      published: true,
    },
    {
      slug: "project-management-consultancy",
      title: "Project Management and Consultancy",
      shortDescription:
        "Independent project management, FIDIC contract administration, value engineering, construction audits, and client representation.",
      fullDescription:
        "We serve as the client's strategic technical advocate, safeguarding capital investments and ensuring that complex projects finish on schedule, within budget, and to international specifications. Our consultancy team employs earned value management (EVM), CPM scheduling, risk register modeling, and rigorous dispute prevention under standard FIDIC and bespoke contract frameworks.",
      heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
      iconName: "Briefcase",
      scope: [
        "Client representation and Owner's Engineer advisory",
        "Comprehensive Project Management Unit (PMU) setup",
        "FIDIC contract administration and claims assessment",
        "Value engineering and cost-reduction structural reviews",
        "Critical Path Method (CPM) scheduling and milestone tracking",
        "Independent quality assurance inspections and handover audits",
      ],
      capabilities: [
        "Primavera P6 and MS Project enterprise scheduling",
        "Earned Value Management (EVM) cost control indices",
        "Comprehensive risk register development and mitigation tracking",
        "Dispute adjudication board preparation and technical arbitration",
      ],
      displayOrder: 5,
      published: true,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log("Services seeded.");

  // 5. Featured Projects
  const projectsData = [
    {
      slug: "the-obsidian-executive-towers",
      title: "The Obsidian Executive Towers",
      categorySlug: "commercial",
      location: "Financial District, Addis Ababa",
      status: "Completed",
      year: "2025",
      client: "East Africa Commercial Holdings",
      scopeOfWork:
        "Full turnkey EPC delivery encompassing 4 basement levels of diaphragm walling, 24 storeys of post-tensioned reinforced concrete, double-glazed low-E curtain walling, BMS building automation, and high-speed destination dispatch elevators.",
      description:
        "The Obsidian Executive Towers stand as a defining silhouette on the capital's skyline. Designed and constructed to international Class-A commercial standards, the dual-tower complex houses leading international financial institutions and diplomatic missions. The structural engineering team pioneered the use of 60 MPa self-compacting concrete and post-tensioned slabs to achieve expansive 12-meter column-free office floor plates.",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 1,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80", caption: "Exterior architectural perspective at dusk", isCover: true, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80", caption: "Atrium lobby and structural column detail", isCover: false, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80", caption: "Executive floor spatial arrangement", isCover: false, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80", caption: "BIM structural model render", isCover: false, isRender: true },
      ],
    },
    {
      slug: "aura-heights-luxury-residences",
      title: "Aura Heights Luxury Residences",
      categorySlug: "residential",
      location: "Bole Hills, Addis Ababa",
      status: "Completed",
      year: "2024",
      client: "Aura Prime Developments",
      scopeOfWork:
        "Architectural design, structural execution, acoustic insulation, smart home automation integration, infinity swimming pool structural engineering, and subterranean automated parking facility.",
      description:
        "Aura Heights is a bespoke 18-storey residential sanctuary comprising 84 curated luxury residences. Designed with biophilic principles, the building features cantilevered sky gardens, thermally broken aluminum façade systems, and advanced acoustic floating floors that reduce sound transmission between units.",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 2,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80", caption: "Façade geometry and cantilevered balconies", isCover: true, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80", caption: "Penthouse terrace overlooking city panorama", isCover: false, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", caption: "Interior finishes and natural limestone flooring", isCover: false, isRender: false },
      ],
    },
    {
      slug: "east-african-logistics-park",
      title: "East African Logistics Park",
      categorySlug: "industrial",
      location: "Dukem Industrial Corridor",
      status: "Completed",
      year: "2024",
      client: "Trans-Continental Logistics Consortium",
      scopeOfWork:
        "Master civil grading, 45,000 sqm long-span structural steel portal frames, laser-screeded superflat concrete floors (FM2 tolerance), fire suppression sprinkler network, and 2.4 MW rooftop solar integration.",
      description:
        "The East African Logistics Park is the region's largest multi-modal warehousing hub. Our civil and structural teams engineered 36-meter clear span steel portals without interior intermediate columns, maximizing volumetric storage efficiency. The heavy-duty concrete slab features steel-fiber reinforcement capable of bearing 100 kN/m² point loads for automated narrow-aisle racking.",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 3,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80", caption: "Automated warehouse logistics bays", isCover: true, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80", caption: "Heavy structural steel truss assembly", isCover: false, isRender: false },
      ],
    },
    {
      slug: "southern-expressway-interchange",
      title: "Southern Expressway Interchange & Overpass",
      categorySlug: "infrastructure",
      location: "Southern Transit Corridor",
      status: "Completed",
      year: "2023",
      client: "Federal Highway Administration",
      scopeOfWork:
        "Grade-separated trumpet interchange, 420-meter pre-stressed concrete box-girder flyover, mechanically stabilized earth (MSE) retaining walls, integrated high-capacity storm drains, and LED smart roadway illumination.",
      description:
        "A critical national arterial nexus, this 4-lane grade-separated interchange eliminated severe transit bottlenecks connecting the capital to industrial freight hubs. The bridge spans feature elastomeric bearing pads, seismic expansion joints, and pre-cast post-tensioned segmental concrete box girders fabricated offsite to prevent traffic disruption during construction.",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 4,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80", caption: "Overpass curve and flyover concrete alignment", isCover: true, isRender: false },
        { imageUrl: "https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=1600&q=80", caption: "Pre-stressing tendon tensioning operations", isCover: false, isRender: false },
      ],
    },
    {
      slug: "crestline-financial-center",
      title: "Crestline Financial Center",
      categorySlug: "commercial",
      location: "Central Business District, Addis Ababa",
      status: "Ongoing",
      year: "2026",
      client: "Crestline Banking Corporation",
      scopeOfWork:
        "32-storey commercial banking headquarters, tuned mass damper seismic damping, smart kinetic sun-shading louvers, and certified LEED Platinum structural design.",
      description:
        "Currently under construction, Crestline Financial Center will be one of East Africa's most technologically sophisticated towers. The structure incorporates an innovative composite steel-concrete core, high-efficiency geothermal heat pumps, and a rooftop aerodynamic vortex generator.",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 5,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80", caption: "Architectural 3D render of completed tower", isCover: true, isRender: true },
        { imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1600&q=80", caption: "Ongoing slipform core concrete pour", isCover: false, isRender: false },
      ],
    },
    {
      slug: "horizon-valley-eco-estates",
      title: "Horizon Valley Eco-Estates",
      categorySlug: "residential",
      location: "Entoto Foothills",
      status: "Ongoing",
      year: "2026",
      client: "GreenScape Living Developments",
      scopeOfWork:
        "Master-planned 120-villa community, mass-timber and low-carbon cement structures, off-grid micro-hydro and solar power network, biological wastewater filtration reeds, and permeable roadway paving.",
      description:
        "Horizon Valley sets a new benchmark for sustainable residential developments in East Africa. Each luxury villa is situated to maximize solar gain and cross-ventilation, reducing active HVAC energy demand by 65%.",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 6,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80", caption: "Villa architectural model and landscaped terrain", isCover: true, isRender: true },
      ],
    },
    {
      slug: "blue-nile-agri-processing-complex",
      title: "Blue Nile Agri-Processing Complex",
      categorySlug: "industrial",
      location: "Bahir Dar Industrial Hub",
      status: "Completed",
      year: "2023",
      client: "Blue Nile Agro-Industries Ltd",
      scopeOfWork:
        "Cleanroom food-grade production facilities, temperature-controlled cold chain storage (-25C), industrial steam boiler infrastructure, and effluent biological treatment plant.",
      description:
        "Delivered under a rapid 14-month schedule, this 32,000 sqm agro-processing facility provides ISO 22000 compliant packaging and storage. Our engineers designed chemical-resistant polyurethane flooring, insulated PIR sandwich panels, and a self-contained effluent treatment plant.",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 7,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80", caption: "Processing line structural integration", isCover: true, isRender: false },
      ],
    },
    {
      slug: "metropolitan-water-treatment-facility",
      title: "Metropolitan Water Treatment Facility",
      categorySlug: "infrastructure",
      location: "Eastern Catchment Basin",
      status: "Ongoing",
      year: "2026",
      client: "Municipal Water and Sewerage Authority",
      scopeOfWork:
        "150,000 m3/day municipal water clarification, rapid gravity sand filters, chemical dosing building, 25,000 m3 post-tensioned clear water reservoir, and 18 km DN1200 ductile iron transmission main.",
      description:
        "A monumental public utility initiative expanding clean potable water security to over 800,000 citizens. The structural team engineered crack-controlled watertight concrete tanks to BS 8007 standards with specialized hydrophilic waterstops.",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?auto=format&fit=crop&w=1600&q=80",
      displayOrder: 8,
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?auto=format&fit=crop&w=1600&q=80", caption: "Clarifier tank structural concrete formwork", isCover: true, isRender: false },
      ],
    },
  ];

  for (const p of projectsData) {
    const categoryId = categoriesMap[p.categorySlug];
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        categoryId,
        location: p.location,
        status: p.status,
        year: p.year,
        client: p.client,
        scopeOfWork: p.scopeOfWork,
        description: p.description,
        featured: p.featured,
        coverImage: p.coverImage,
        displayOrder: p.displayOrder,
        images: {
          create: p.images,
        },
      },
    });
  }
  console.log("Projects seeded.");

  // 6. Leadership & Team Members
  const teamData = [
    {
      name: "Eng. Dawit Alemayehu, PE, FIE",
      designation: "Executive Chairman & Principal Structural Engineer",
      department: "Executive Leadership",
      bio: "With over 28 years of structural engineering leadership across East Africa and the Middle East, Eng. Dawit has directed the structural design and execution of over 50 major high-rise, industrial, and infrastructure developments. He holds an MSc in Advanced Structural Engineering from Imperial College London and is a Fellow of the Institution of Engineers.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "d.alemayehu@oaksafricagroup.com",
      isLeadership: true,
      displayOrder: 1,
    },
    {
      name: "Ar. Sara Kassa, AIA, EAR",
      designation: "Head of Architectural Design & Urban Planning",
      department: "Design & Planning",
      bio: "Sara directs OAKS AFRICA GROUP's architectural vision, marrying biophilic, sustainable design with bold African contextual identity. Trained at the Architectural Association (AA) London, she has won multiple international awards for urban density design and commercial landmark architecture.",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "s.kassa@oaksafricagroup.com",
      isLeadership: true,
      displayOrder: 2,
    },
    {
      name: "Eng. Michael Tesfaye, PMP, MICE",
      designation: "Chief Operating Officer & Head of Construction",
      department: "Operations & Delivery",
      bio: "Michael oversees turnkey site operations, supply chain logistics, and health & safety compliance across all active project sites. A certified Project Management Professional (PMP) with 20 years in heavy civil and commercial building delivery, he champions digital construction tracking and lean manufacturing in construction.",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "m.tesfaye@oaksafricagroup.com",
      isLeadership: true,
      displayOrder: 3,
    },
    {
      name: "Eng. Helen Gebremariam, MSc",
      designation: "Director of Civil & Infrastructure Engineering",
      department: "Civil Engineering",
      bio: "Specializing in transportation corridors, hydrological hydraulic modeling, and geotechnical stabilization, Helen directs the firm's civil engineering projects. She has served as key engineering consultant on national highway expansion programs.",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "h.gebre@oaksafricagroup.com",
      isLeadership: true,
      displayOrder: 4,
    },
    {
      name: "Tadesse Wolde, MRICS",
      designation: "Commercial Director & Chief Quantity Surveyor",
      department: "Commercial & Contracts",
      bio: "A Member of the Royal Institution of Chartered Surveyors (MRICS), Tadesse manages commercial risk, FIDIC contract administration, value engineering, and financial procurement for high-capital ventures.",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "t.wolde@oaksafricagroup.com",
      isLeadership: false,
      displayOrder: 5,
    },
  ];

  for (const t of teamData) {
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: t });
    }
  }
  console.log("Team members seeded.");

  // 7. News Categories and Articles
  const newsCategoriesData = [
    { name: "Company Announcements", slug: "announcements" },
    { name: "Project Updates", slug: "project-updates" },
    { name: "Engineering Insights", slug: "engineering-insights" },
  ];

  const newsCategoriesMap: Record<string, string> = {};
  for (const nc of newsCategoriesData) {
    const record = await prisma.newsCategory.upsert({
      where: { slug: nc.slug },
      update: {},
      create: nc,
    });
    newsCategoriesMap[nc.slug] = record.id;
  }

  const articlesData = [
    {
      slug: "oaks-africa-group-awarded-crestline-tower-epc-contract",
      title: "OAKS AFRICA GROUP Awarded 32-Storey Crestline Financial Center Contract",
      summary:
        "The landmark contract reinforces OAKS AFRICA GROUP's status as the principal contractor of choice for high-rise seismic-rated commercial developments in East Africa.",
      content: `OAKS AFRICA GROUP has been officially awarded the engineering, procurement, and construction (EPC) contract for the Crestline Financial Center in Addis Ababa's burgeoning financial district.

The 32-storey commercial banking headquarters will feature state-of-the-art seismic engineering, a tuned mass damper system, and high-performance double-glazed solar thermal curtain walls designed to achieve LEED Platinum certification.

"This award underscores our team's continuous commitment to technical rigor, advanced structural modeling, and uncompromising construction execution," stated Eng. Dawit Alemayehu, Executive Chairman. "We look forward to delivering a beacon of modern financial architecture that will define the skyline for decades to come."

Groundbreaking operations have commenced, with bulk earthwork and diaphragm wall excavation already reaching Level -2.`,
      featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      author: "OAKS Corporate Communications",
      categorySlug: "announcements",
      readingTime: "3 min read",
      published: true,
    },
    {
      slug: "post-tensioned-concrete-engineering-advancements-in-africa",
      title: "Engineering Advancements: Why Post-Tensioned Concrete Is Reshaping High-Rise Construction",
      summary:
        "An in-depth technical analysis on how post-tensioning reduces structural dead load, cuts carbon footprint, and yields expansive column-free commercial spaces.",
      content: `As African metropolitan centers densify, developers and structural engineers face the dual imperative of maximizing usable floor space while curbing embodied carbon and foundation material demands.

Post-tensioned (PT) concrete slabs represent a decisive breakthrough. By introducing high-strength steel tendons tensioned after concrete curing, engineers can design thinner slabs capable of spanning greater distances without interior intermediate columns.

In our recent delivery of The Obsidian Executive Towers, our structural design team achieved 12-meter clear spans with a 240mm PT slab profile. This yielded a 22% overall reduction in concrete volume, lower seismic mass, and accelerated formwork cycling from 14 days down to 6 days per floor.

As regional aggregate and cement prices evolve, value engineering through post-tensioning provides an undeniable competitive advantage.`,
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1600&q=80",
      author: "Eng. Dawit Alemayehu, PE",
      categorySlug: "engineering-insights",
      readingTime: "5 min read",
      published: true,
    },
    {
      slug: "sustainable-infrastructure-resilient-drainage-networks",
      title: "Building Climate-Resilient Urban Infrastructure in High-Precipitation Zones",
      summary:
        "How integrated hydrological catchment modeling and high-capacity box culverts protect vital transportation corridors from flash flood risks.",
      content: `Urban expansion without commensurate arterial drainage planning inevitably leads to catastrophic transit disruption and infrastructure deterioration during seasonal rains.

During the execution of the Southern Expressway Interchange, OAKS AFRICA GROUP implemented 100-year flood event hydrologic modeling. Our civil team designed a cascade system of pre-cast reinforced box culverts and retention swales that divert over 45 cubic meters of stormwater per second safely into regional natural catchment waterways.

Investing in resilient subsurface drainage at project inception reduces long-term pavement maintenance costs by more than 40% over a 30-year operational horizon.`,
      featuredImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
      author: "Eng. Helen Gebremariam, MSc",
      categorySlug: "project-updates",
      readingTime: "4 min read",
      published: true,
    },
  ];

  for (const a of articlesData) {
    const categoryId = newsCategoriesMap[a.categorySlug];
    await prisma.newsArticle.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        content: a.content,
        featuredImage: a.featuredImage,
        author: a.author,
        categoryId,
        readingTime: a.readingTime,
        published: a.published,
      },
    });
  }
  console.log("News articles seeded.");

  // 8. Job Vacancies
  const vacanciesData = [
    {
      title: "Senior Structural Project Engineer",
      slug: "senior-structural-project-engineer",
      department: "Structural Engineering",
      location: "Addis Ababa, Ethiopia (Head Office & Sites)",
      employmentType: "Full-time",
      description:
        "We are seeking an exceptional Senior Structural Engineer to lead the analysis, design, and construction supervision of high-rise commercial structures and seismic-resistant developments.",
      requirements: [
        "BSc or MSc in Civil / Structural Engineering from an accredited university",
        "Minimum 8+ years of progressive structural design and site supervision experience",
        "Proficiency in ETABS, SAFE, SAP2000, and Revit Structure",
        "Demonstrated experience in post-tensioned slab design and high-strength concrete",
        "Professional Engineering (PE) or equivalent registration",
      ],
      responsibilities: [
        "Direct structural calculation reports and statutory authority submissions",
        "Oversee site engineering teams and verify rebar, formwork, and PT tendon installations",
        "Perform peer reviews and value engineering on subcontractor submittals",
        "Coordinate with architectural, MEP, and geotechnical teams in a unified BIM environment",
      ],
      isActive: true,
    },
    {
      title: "Senior Project Architect",
      slug: "senior-project-architect",
      department: "Architectural & Engineering Design",
      location: "Addis Ababa, Ethiopia",
      employmentType: "Full-time",
      description:
        "Lead architectural design development, client workshops, and construction documentation for signature commercial, residential, and institutional developments.",
      requirements: [
        "Professional degree in Architecture (B.Arch or M.Arch)",
        "7+ years of experience delivering multi-storey commercial or residential projects",
        "Expertise in Revit BIM Level 2 workflows, Rhino, and Enscape/Lumion",
        "Strong knowledge of building codes, façade systems, and sustainable design standards (LEED/EDGE)",
      ],
      responsibilities: [
        "Translate master planning concepts into buildable, high-impact architectural solutions",
        "Lead design coordination meetings with structural, MEP, and landscape consultants",
        "Produce comprehensive technical specification packages and review material submittals",
        "Perform site inspections to ensure compliance with architectural design intent",
      ],
      isActive: true,
    },
    {
      title: "Site Quality Assurance / Quality Control (QA/QC) Manager",
      slug: "qa-qc-manager-construction",
      department: "Quality Assurance",
      location: "Active Construction Sites (Central & Regional)",
      employmentType: "Full-time",
      description:
        "Manage rigorous quality control protocols across site operations, concrete batching, structural steel erection, and finishing works.",
      requirements: [
        "Degree in Civil Engineering, Construction Management, or Materials Engineering",
        "6+ years in QA/QC management for large-scale construction or infrastructure projects",
        "Certified in ISO 9001 Quality Management Systems auditing",
        "In-depth knowledge of concrete testing, non-destructive testing (NDT), and soil compaction standards",
      ],
      responsibilities: [
        "Formulate and enforce project-specific Quality Assurance & Control Plans (QAP)",
        "Supervise third-party laboratory material testing (concrete cubes, steel tensile, soils)",
        "Issue, investigate, and close out non-conformance reports (NCRs)",
        "Compile quality handover dossiers and operations & maintenance documentation",
      ],
      isActive: true,
    },
    {
      title: "Graduate Engineering Intern — Civil / Structural",
      slug: "graduate-engineering-intern-civil-structural",
      department: "Engineering Development Program",
      location: "Addis Ababa, Ethiopia",
      employmentType: "Internship",
      description:
        "A premier 12-month structured rotational internship program for outstanding recent graduates passionate about structural engineering, civil infrastructure, and modern project management.",
      requirements: [
        "Recent graduate with a BSc in Civil Engineering (First Class or High Distinction)",
        "Strong foundational grasp of structural mechanics, fluid dynamics, and materials science",
        "Working familiarity with AutoCAD and structural modeling software",
        "Strong verbal and written English communication skills",
      ],
      responsibilities: [
        "Assist senior engineers with quantity take-offs, reinforcement detailing, and site inspections",
        "Participate in BIM clash detection reviews and site progress documentation",
        "Shadow QA/QC teams during laboratory and on-site material testing",
      ],
      isActive: true,
    },
  ];

  for (const v of vacanciesData) {
    await prisma.jobVacancy.upsert({
      where: { slug: v.slug },
      update: {},
      create: v,
    });
  }
  console.log("Job vacancies seeded.");

  // 9. Company Documents
  const documentsData = [
    {
      title: "OAKS AFRICA GROUP Corporate Profile 2026",
      description: "Official comprehensive corporate capabilities, executive leadership, project portfolio, and technical governance overview.",
      category: DocumentCategory.PROFILE,
      fileUrl: "/documents/oaks-corporate-profile-2026.pdf",
      fileName: "oaks-corporate-profile-2026.pdf",
      fileSize: "14.2 MB",
      isPublished: true,
      displayOrder: 1,
    },
    {
      title: "Capability Statement — Structural & Infrastructure Engineering",
      description: "Detailed technical dossier outlining our structural analysis software, past performance records, and heavy equipment plant fleet.",
      category: DocumentCategory.CAPABILITY,
      fileUrl: "/documents/oaks-capability-statement-infrastructure.pdf",
      fileName: "oaks-capability-statement-infrastructure.pdf",
      fileSize: "8.7 MB",
      isPublished: true,
      displayOrder: 2,
    },
    {
      title: "Health, Safety & Environmental (HSE) Policy Manual",
      description: "Our certified ISO 45001 and ISO 14001 occupational safety, zero-harm hazard prevention, and environmental compliance charter.",
      category: DocumentCategory.CERTIFICATION,
      fileUrl: "/documents/oaks-hse-policy-manual.pdf",
      fileName: "oaks-hse-policy-manual.pdf",
      fileSize: "4.5 MB",
      isPublished: true,
      displayOrder: 3,
    },
    {
      title: "Corporate Brochure — Turnkey Commercial Construction",
      description: "An architectural overview of our design-build methodology, fast-track delivery systems, and client testimonials.",
      category: DocumentCategory.BROCHURE,
      fileUrl: "/documents/oaks-commercial-construction-brochure.pdf",
      fileName: "oaks-commercial-construction-brochure.pdf",
      fileSize: "6.1 MB",
      isPublished: true,
      displayOrder: 4,
    },
  ];

  for (const doc of documentsData) {
    const existing = await prisma.companyDocument.findFirst({ where: { title: doc.title } });
    if (!existing) {
      await prisma.companyDocument.create({ data: doc });
    }
  }
  console.log("Company documents seeded.");

  // 10. Initial Enquiries & RFQ
  const initialEnquiry = await prisma.enquiry.upsert({
    where: { referenceNumber: "OAK-26-8812" },
    update: {},
    create: {
      referenceNumber: "OAK-26-8812",
      name: "Solomon Tarekegn",
      email: "s.tarekegn@apexlogistics.com",
      phone: "+251 91 234 5678",
      company: "Apex Logistics & Freight Hub",
      category: "Industrial",
      location: "Mojo Logistics Center",
      budget: "$5M - $10M",
      description:
        "We are seeking an EPC contractor to design and construct a 28,000 sqm temperature-controlled cold warehouse with heavy structural steel frames and laser-screeded floors. Need feasibility assessment within 3 weeks.",
      status: EnquiryStatus.UNDER_REVIEW,
      assignedTo: "Eng. Michael Tesfaye",
      notes: {
        create: [
          {
            authorName: "Oak Administrator",
            content: "Initial review completed. Structural requirements align with our industrial capabilities. Scheduled discovery call for next Tuesday.",
          },
        ],
      },
    },
  });

  const initialQuotation = await prisma.quotationRequest.upsert({
    where: { referenceNumber: "RFQ-26-4591" },
    update: {},
    create: {
      referenceNumber: "RFQ-26-4591",
      name: "Dr. Alemayehu Woldu",
      email: "alemayehu@ethioproperties.et",
      phone: "+251 92 888 7766",
      company: "Ethio Premier Developments",
      projectTitle: "The View Residences — 16 Storey Tower",
      category: "Residential",
      location: "Kazanchis, Addis Ababa",
      scopeOfWork:
        "Full civil and structural engineering, core and shell execution, 2 basement parking levels, post-tensioned slabs, and complete MEP installation.",
      technicalSpecs: "Targeting Eurocode 2 & 8 seismic compliance. 50 MPa self-compacting concrete specified for structural core columns.",
      estimatedBudget: "$8,500,000",
      status: QuotationStatus.UNDER_REVIEW,
      notes: "Architectural drawings received. BOQ being audited by commercial team.",
    },
  });

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
