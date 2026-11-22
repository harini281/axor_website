import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit,
  CheckCircle2, ChevronRight, Code2, Database, Fingerprint, Globe2, Layers3,
  Menu, MessageCircle, Network, ShieldCheck, Smartphone, Sparkles, X, Linkedin, Github, Instagram, Facebook,
} from 'lucide-react'
import { leadership, siteConfig } from './config/site'

const HeroScene = lazy(() => import('./components/HeroScene'))
const AmbientScene = lazy(() => import('./components/AmbientScene'))

const services = [
  { n: '01', icon: BrainCircuit, title: 'AI & Intelligent Systems', line: 'Turn complex work into clearer decisions', detail: 'When knowledge is scattered and repetitive work slows people down, intelligent systems can connect information and support better decisions. We design practical AI features with clear boundaries and human oversight.', capabilities: ['LLM and knowledge-based product features', 'AI agents and workflow automation', 'Machine learning and computer vision'], value: 'Put useful intelligence into products and workflows without losing sight of accuracy, accountability or the people using them.' },
  { n: '02', icon: Code2, title: 'Software Engineering', line: 'Build software around the way work happens', detail: 'When disconnected tools and manual processes get in the way, purpose-built software can create a more dependable foundation. We engineer web, mobile and backend systems around real operational needs.', capabilities: ['Web and mobile application development', 'Backend services, APIs and integrations', 'Application architecture and modernization'], value: 'Give teams maintainable systems that fit their processes and can evolve as requirements change.' },
  { n: '03', icon: Database, title: 'Data & Analytics', line: 'Make scattered data useful', detail: 'When important information lives across spreadsheets, applications and databases, it is difficult to see what is happening. We help organise data and make it easier to understand.', capabilities: ['Data preparation and engineering', 'Business intelligence and dashboards', 'Exploratory analysis and reporting'], value: 'Create a clearer view of operations so teams can make informed decisions from data they understand.' },
  { n: '04', icon: ShieldCheck, title: 'Cybersecurity', line: 'Make security part of the engineering process', detail: 'As applications and data become more connected, security needs to be considered throughout design and delivery. We focus on practical safeguards and security-minded development.', capabilities: ['Application and API security practices', 'Risk-aware design and access controls', 'Secure development and data protection foundations'], value: 'Reduce avoidable exposure by making security an explicit part of how digital systems are planned and built.' },
  { n: '05', icon: Layers3, title: 'Cloud & DevOps', line: 'Make delivery and infrastructure more dependable', detail: 'When environments are difficult to maintain and releases are inconsistent, cloud and DevOps practices can improve the way software is delivered and operated.', capabilities: ['Cloud-ready application architecture', 'Containerisation and CI/CD foundations', 'Deployment, monitoring and operational practices'], value: 'Create repeatable delivery workflows and infrastructure that can be maintained with greater confidence.' },
  { n: '06', icon: Globe2, title: 'Digital Growth', line: 'Give your digital presence a clearer purpose', detail: 'A website or digital channel should help people understand what a business offers and how to take the next step. We connect digital experience with practical growth foundations.', capabilities: ['Search engine optimisation foundations', 'Content and digital channel planning', 'Analytics and conversion experience reviews'], value: 'Make digital channels easier to discover, understand and improve using clear goals and measurable signals.' },
  { n: '07', icon: Sparkles, title: 'Design & Consulting', line: 'Find the right direction before building', detail: 'When the problem, audience or solution is not yet clear, thoughtful discovery helps teams make better decisions before investing in implementation.', capabilities: ['Product discovery and solution definition', 'UX and interface design', 'Technology planning and digital transformation guidance'], value: 'Align people, priorities and technical direction around a solution that is useful, achievable and considered.' },
]


const technologyGroups = [
  { category: 'AI and intelligent systems', tools: ['Python', 'Scikit-learn', 'LLM integration', 'Computer vision'] },
  { category: 'Application engineering', tools: ['React', 'TypeScript', 'Node.js', 'ASP.NET Core', 'REST APIs', 'Flutter'] },
  { category: 'Data and analytics', tools: ['PostgreSQL', 'MongoDB', 'Power BI', 'ETL pipelines'] },
  { category: 'Security and delivery', tools: ['API security', 'Docker', 'GitHub Actions', 'CI/CD', 'Cloud services', 'Monitoring'] },
]


const principles = [
  { number: '01', kanji: '改善', name: 'Kaizen', title: 'Continuous Improvement', description: 'We believe progress is a continuous process. We consistently refine our ideas, processes and technologies to deliver better outcomes.', application: 'Continuous product and process improvement.' },
  { number: '02', kanji: 'こだわり', name: 'Kodawari', title: 'Dedication to Excellence', description: 'We care deeply about the details. We pursue thoughtful engineering, quality craftsmanship and solutions built with intention.', application: 'Engineering quality and attention to detail.' },
  { number: '03', kanji: '絆', name: 'Kizuna', title: 'Connection & Trust', description: 'We build meaningful relationships through collaboration, transparency and mutual respect. Strong connections create stronger outcomes.', application: 'Client relationships and collaborative teamwork.' },
  { number: '04', kanji: '我慢', name: 'Gaman', title: 'Resilience & Perseverance', description: 'We approach challenges with patience, discipline and determination. Meaningful progress requires consistency and the courage to overcome obstacles.', application: 'Persistence through complex technical challenges.' },
]


const projects = [
  { type: 'AI APPLICATIONS', title: 'Intelligent product experiences', desc: 'A demonstration space for applied AI patterns, including structured assistants and context-aware workflows.', label: 'Concept demonstration' },
  { type: 'INTELLIGENT AUTOMATION', title: 'Connected business workflows', desc: 'A demonstration of how well-scoped automation can connect information, decisions and human review.', label: 'Concept demonstration' },
  { type: 'DATA INTELLIGENCE', title: 'From operational data to insight', desc: 'A demonstration of analytical interfaces that help make complex information easier to understand.', label: 'Concept demonstration' },
]

const socialItems = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin, url: siteConfig.social.linkedin },
  { key: 'github', label: 'GitHub', Icon: Github, url: siteConfig.social.github },
  { key: 'instagram', label: 'Instagram', Icon: Instagram, url: siteConfig.social.instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook, url: siteConfig.social.facebook },
]

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [selectedService, setSelectedService] = useState('')
  const [activeSection, setActiveSection] = useState('#top')
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const reducedMotion = useReducedMotion()
  const navItems = useMemo(() => [
    ['About', '#about'], ['Services', '#services'], ['Industries', '#industries'], ['Technology', '#technology'], ['Our Work', '#work'], ['Insights', '#insights'],
  ], [])

  const whatsappUrl = (message: string) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!siteConfig.contactEndpoint) {
      setFormState('error')
      setFormMessage('Online enquiries are not connected yet. A verified secure enquiry endpoint must be configured before submissions can be accepted.')
      return
    }
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      budget: String(data.get('budget') ?? '').trim(),
      timeline: String(data.get('timeline') ?? '').trim(),
      description: String(data.get('description') ?? '').trim(),
    }
    setFormState('submitting')
    setFormMessage('')
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Enquiry submission failed')
      setFormState('success')
      setFormMessage('Your enquiry has been sent. Thank you for contacting Zentaro.')
      form.reset()
      setSelectedService('')
    } catch {
      setFormState('error')
      setFormMessage('Your enquiry could not be sent. Please try again later.')
    }
  }

  useEffect(() => {
    const targets = navItems.map(([, href]) => document.querySelector<HTMLElement>(href)).filter((target): target is HTMLElement => Boolean(target))
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current?.target.id) setActiveSection(`#${current.target.id}`)
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.2, 0.5, 0.75] })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [navItems])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ZENTARO Technologies home">
          <span className="brand-copy"><b>ZENTARO</b><small>Technologies</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') closeMenu() }}>
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu} aria-current={activeSection === href ? 'location' : undefined}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s Talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={reveal}>
              <div className="eyebrow"><span /> Engineering and intelligent systems</div>
              <h1>Engineering <em>Intelligence.</em><br />Building What's Next.</h1>
              <p className="hero-lede">We engineer intelligent digital solutions that help businesses innovate, automate operations, strengthen security and accelerate growth.</p>
              <div className="hero-actions">
                <a className="button button-gold" href="#services">Explore Capabilities <ArrowUpRight size={17} /></a>
                <a className="text-link" href="#contact">Discuss a Project <ArrowDownRight size={17} /></a>
              </div>
            </motion.div>
          </div>
          <div className="hero-visual">
            <Suspense fallback={<div className="scene-fallback"><span>AX</span><small>ENGINEERING INTELLIGENCE</small></div>}>
              <HeroScene reducedMotion={Boolean(reducedMotion)} />
            </Suspense>
            <div className="hero-visual-index">Figure 01 <span>Interconnected systems</span></div>
          </div>
          <div className="hero-bottom"><span>Strategy · Engineering · Intelligence</span><a href="#about">Discover Zentaro <ArrowDown size={13} /></a></div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-index">01 / ABOUT ZENTARO</div>
          <div className="intro-content">
            <h2>Technology should<br />create <em>possibility.</em></h2>
            <div className="intro-aside">
              <p>Zentaro Technologies is an engineering company working across intelligent systems, software, data, security, cloud and digital experiences. We bring business context and engineering together to make complex challenges more approachable.</p>
              <p className="muted">Technology defines what we build. Our principles define how we build it.</p>
            </div>
          </div>
          <div className="principle-strip"><span>01 — UNDERSTAND THE PROBLEM</span><span>02 — ENGINEER THE SOLUTION</span><span>03 — BUILD FOR WHAT’S NEXT</span></div>
          <motion.div className="vision-mission" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <article><span>OUR VISION</span><h3>Make intelligent technology a meaningful force for progress.</h3><p>We aspire to help businesses and communities move forward through useful, responsible and thoughtfully engineered digital solutions.</p></article>
            <article><span>OUR MISSION</span><h3>Turn complex challenges into technology people can rely on.</h3><p>We combine software engineering, applied AI and a problem-first mindset to create solutions that are practical today and adaptable for tomorrow.</p></article>
          </motion.div>
        </section>

        <section className="capabilities section-pad" id="services">
          <div className="section-heading">
            <div><div className="section-index">02 / Capabilities</div><h2>Technology that<br /><em>moves work forward.</em></h2></div>
            <p>We focus on the business challenge first, then bring the right combination of engineering, data and AI to address it.</p>
          </div>
          <div className="services-experience">
            <div className="service-selector" role="tablist" aria-label="ZENTARO services">
              {services.map((service, index) => {
                const Icon = service.icon
                return <button className={activeService === index ? 'service-tab active' : 'service-tab'} key={service.n} role="tab" aria-selected={activeService === index} aria-controls="service-detail" onClick={() => setActiveService(index)}>
                  <span className="tab-number">{service.n}</span><Icon size={18} /><span>{service.title}</span><ChevronRight size={16} className="tab-chevron" />
                </button>
              })}
            </div>
            <motion.div className="service-detail" id="service-detail" role="tabpanel" key={activeService} initial={reducedMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {(() => { const s = services[activeService]; const Icon = s.icon; return <>
                <div className="detail-icon"><Icon size={27} strokeWidth={1.35} /></div>
                <span className="detail-kicker">{s.n} / {s.title}</span>
                <h3>{s.line}</h3><p className="detail-description">{s.detail}</p>
                <div className="detail-columns"><div><b>TECHNICAL CAPABILITIES</b>{s.capabilities.map(item => <span key={item}><CheckCircle2 size={14} />{item}</span>)}</div><div><b>BUSINESS VALUE</b><p>{s.value}</p></div></div>
                <a className="detail-link" href="#contact" onClick={() => setSelectedService(s.title)}>Discuss this capability <ArrowUpRight size={16} /></a>
              </> })()}
            </motion.div>
          </div>
        </section>

        <section className="industries section-pad" id="industries">
          <div className="section-heading">
            <div><div className="section-index">03 / Industries</div><h2>Technology shaped<br /><em>around your world.</em></h2></div>
            <p>Different industries face different constraints. We start with the context, workflows and people involved before recommending a technical approach.</p>
          </div>
          <div className="industry-grid">
            {[
              ['01','Banking & financial services','Digital platforms, workflow automation, analytics and security-minded engineering.'],
              ['02','Healthcare & life sciences','Applications, data platforms and operational workflows designed around real needs.'],
              ['03','Education & EdTech','Learning experiences, student platforms and useful education technology.'],
              ['04','Retail & e-commerce','Commerce experiences, inventory workflows and customer insight.'],
              ['05','Manufacturing','Operational systems, process automation and connected data.'],
              ['06','Agriculture & food technology','Management tools, monitoring workflows and supply-chain applications.'],
              ['07','Professional services','Business websites, client experiences and workflow optimisation.'],
              ['08','Startups & SMEs','MVPs, product engineering and practical technology roadmaps.'],
            ].map(([n,title,desc]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}
          </div>
          <p className="section-footnote">These are potential areas of application, not claims of completed client engagements.</p>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><div className="section-index">06 / Selected work</div><h2>Ideas made<br /><em>tangible.</em></h2></div>
            <p>Selected technical demonstrations show the kinds of problems we explore. These concepts are not presented as client case studies.</p>
          </div>
          <div className="work-visual-band">
            <div><span>Prototype / exploration</span><b>Turning abstract challenges<br />into tangible systems.</b></div>
            <Suspense fallback={<div className="ambient-fallback">ZENTARO / LAB</div>}>
              <AmbientScene variant="orbit" />
            </Suspense>
            <span className="work-visual-index">INTERACTIVE STUDIES · 001—003</span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <motion.article className={`project-card project-${index + 1}`} key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} whileHover={reducedMotion ? undefined : { y: -8, rotateX: 2, rotateY: index === 1 ? -1.5 : 1.5 }}>
              <div className="project-art"><div className="project-art-core">{index === 0 ? <BrainCircuit /> : index === 1 ? <Network /> : <Database />}</div><span>ZENTARO / CONCEPT 0{index + 1}</span><div className="project-art-orbit" /></div>
              <div className="project-meta"><span>{project.type}</span><small>{project.label}</small></div><h3>{project.title}</h3><p>{project.desc}</p>
            </motion.article>)}
          </div>
        </section>

        <section className="technology section-pad" id="technology">
          <div className="section-heading">
            <div><div className="section-index">04 / Technology landscape</div><h2>The right tools.<br /><em>Thoughtfully applied.</em></h2></div>
            <p>Technology choices should follow the problem, the product and the people who will depend on it. This is the engineering landscape we work across—not a claim that every tool is used in every project.</p>
          </div>
          <div className="technology-showcase">
            <div className="technology-grid">
              {technologyGroups.map((group, index) => <motion.article className="technology-group" key={group.category} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ delay: index * 0.07 }}>
                <div className="technology-number">0{index + 1}</div><h3>{group.category}</h3>
                <div className="technology-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
              </motion.article>)}
            </div>
            <div className="technology-object">
              <Suspense fallback={<div className="ambient-fallback">ZENTARO / SYSTEMS</div>}>
                <AmbientScene variant="intelligence" />
              </Suspense>
              <div className="object-caption"><span>Figure 02 / Intelligence core</span><b>Systems that connect.<br />Ideas that compound.</b></div>
            </div>
          </div>
          <p className="technology-note">Our stack is selected case by case, with attention to maintainability, security, performance and long-term fit.</p>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="section-index">05 / Engineering approach</div>
          <div className="approach-layout">
            <h2>Clarity first.<br /><em>Engineering</em><br />always.</h2>
            <div className="approach-copy"><p className="large-copy">The strongest technology begins with a clear understanding of the challenge.</p><p>We work from discovery through delivery with an emphasis on useful outcomes, considered architecture and responsible implementation.</p>
              <div className="process-list"><div><span>01</span><b>Discover</b><small>Understand the people, context and problem.</small></div><div><span>02</span><b>Define</b><small>Shape a practical scope and technical direction.</small></div><div><span>03</span><b>Engineer</b><small>Build, integrate and validate the solution.</small></div><div><span>04</span><b>Evolve</b><small>Prepare the product to learn and grow.</small></div></div>
            </div>
          </div>
          <div className="approach-values"><div><ShieldCheck /><b>Security-minded</b><span>Considered from the beginning.</span></div><div><Fingerprint /><b>Human-centred</b><span>Designed around real people.</span></div><div><Globe2 /><b>Built to scale</b><span>Ready for changing needs.</span></div></div>
          <div className="approach-visual">
            <div className="approach-visual-copy"><span>Engineering in layers</span><b>From a clear foundation<br />to a connected system.</b><small>Architecture · Integration · Validation · Evolution</small></div>
            <Suspense fallback={<div className="ambient-fallback">STRUCTURE / 03</div>}>
              <AmbientScene variant="architecture" />
            </Suspense>
            <span className="approach-visual-index">Zentaro / Engineering model 03</span>
          </div>
        </section>

        

        

        <section className="principles section-pad" id="principles">
          <div className="section-index">06 / The principles that guide us</div>
          <div className="principles-heading">
            <h2>More Than Technology.<br /><em>A Way of Thinking.</em></h2>
            <p>Our work is shaped by principles that influence how we think, build, collaborate and grow. They are not simply values we display. They are standards we strive to practise in everything we do.</p>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => <article key={principle.number}>
              <div className="principle-mark"><span>{principle.number}</span><strong lang="ja">{principle.kanji}</strong></div>
              <h3>{principle.name}</h3>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
              <div className="principle-application"><span>Application</span><p>{principle.application}</p></div>
            </article>)}
          </div>
        </section>

        <section className="leadership section-pad" id="leadership">
          <div className="section-heading">
            <div><div className="section-index">07 / Founding leadership</div><h2>Meet the Minds<br /><em>Behind ZENTARO.</em></h2></div>
            <p>Three co-founders. Shared principles. A considered approach to engineering.</p>
          </div>
          <div className="leadership-grid">
            {leadership.map((person, index) => <motion.article className="leader-card" key={person.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} whileHover={reducedMotion ? undefined : { y: -7, rotateX: 1.5 }}>
              <div className={`leader-portrait portrait-${index + 1}`}><img className={`leader-photo leader-photo-${index + 1}`} src={person.portrait} alt={`${person.name}, ${person.role} of ZENTARO Technologies`} /></div>
              <div className="leader-info"><div className="leader-role">{person.role}</div><h3>{person.name}</h3><p>{person.intro}</p><div className="leader-focus"><b>AREA OF FOCUS</b><span>{person.focus}</span></div>
                {person.linkedin ? <a className="leader-social" href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}><Linkedin size={16} /></a> : <span className="leader-social unavailable" title="LinkedIn profile not configured"><Linkedin size={16} /></span>}
              </div>
            </motion.article>)}
          </div>
          <p className="portrait-note">ZENTARO Technologies was founded by this leadership team: three co-founders bringing together business, technology and information security.</p>
        </section>

        

        <section className="insights section-pad" id="insights">
          <div className="section-heading">
            <div><div className="section-index">08 / Insights & knowledge</div><h2>Ideas worth<br /><em>thinking through.</em></h2></div>
            <p>Our knowledge centre will focus on practical perspectives across the technologies and engineering disciplines that shape digital products.</p>
          </div>
          <div className="insight-grid">
            {[
              ['AI & INTELLIGENT SYSTEMS','AI agents, applied machine learning, generative AI and responsible automation.'],
              ['SOFTWARE ENGINEERING','Architecture, product development, APIs, testing and maintainable systems.'],
              ['SECURITY & CLOUD','Cybersecurity fundamentals, cloud infrastructure, DevOps and resilience.'],
              ['DIGITAL TRANSFORMATION','Data-informed operations, digital experiences and technology strategy.'],
            ].map(([title,desc],i)=><article key={title}><span>KNOWLEDGE THEME / 0{i+1}</span><h3>{title}</h3><p>{desc}</p><small>Editorial content coming as articles are reviewed and approved.</small></article>)}
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="section-heading"><div><div className="section-index">09 / FAQ</div><h2>Good questions.<br /><em>Clear answers.</em></h2></div><p>A few useful starting points before beginning a conversation with ZENTARO.</p></div>
          <div className="faq-list">
            <details><summary>What kind of work does ZENTARO take on?</summary><p>ZENTARO’s capability areas include intelligent systems, software and application engineering, data and analytics, cybersecurity, cloud and infrastructure, digital growth, and design and consulting.</p></details>
            <details><summary>How does a project usually begin?</summary><p>We begin by understanding the business context, users, objectives and constraints. From there, scope and a suitable technical direction can be discussed.</p></details>
            <details><summary>Can I enquire about only one service?</summary><p>Yes. You can select a specific service in the enquiry form and describe the challenge or outcome you have in mind.</p></details>
            <details><summary>Does ZENTARO publish client results and testimonials?</summary><p>Only verified and approved project information should be published. Demonstrations and internal initiatives are labelled separately from client engagements.</p></details>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="section-index">10 / Contact</div>
          <div className="contact-layout">
            <div className="contact-copy"><h2>Have an ambitious idea?<br /><em>Let’s build it.</em></h2><p>Tell us about the challenge you’re trying to solve. Let’s explore how intelligent technology can move your business forward.</p>
              <div className="contact-note"><p>Tell us what you are trying to make possible. We can begin with the problem, the people involved and the outcome you need.</p></div>
              <div className="contact-direct">
                {siteConfig.whatsappNumber && siteConfig.whatsappDisplay ? <a href={whatsappUrl('Hello Zentaro Technologies, I would like to start a conversation.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WhatsApp</small><b>{siteConfig.whatsappDisplay}</b></span><ArrowUpRight size={16} /></a> : null}
                {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}><ArrowUpRight size={18} /><span><small>Email</small><b>{siteConfig.contactEmail}</b></span></a> : null}
              </div>
            </div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <div className="form-heading"><span>PROJECT ENQUIRY</span><small>Tell us a little about your idea.</small></div>
              <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required minLength={2} /></label>
              <label>Business email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <label>Company or organisation<input name="company" autoComplete="organization" placeholder="Your organisation" required /></label>
              <label>Service of interest<select name="service" required value={selectedService} onChange={(event) => setSelectedService(event.currentTarget.value)}><option value="" disabled>Select a capability</option>{services.map(service => <option key={service.n} value={service.title}>{service.title}</option>)}</select></label>
              <label>Project budget <span className="optional">OPTIONAL</span><select name="budget" defaultValue=""><option value="">Not decided yet</option><option>Under USD 1,000</option><option>USD 1,000–5,000</option><option>USD 5,000–15,000</option><option>USD 15,000+</option><option>Prefer to discuss</option></select></label>
              <label>Expected timeline <span className="optional">OPTIONAL</span><select name="timeline" defaultValue=""><option value="">Not decided yet</option><option>Immediately</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Exploring / planning</option></select></label>
              <label>Project description<textarea name="description" placeholder="What are you looking to build or improve?" required minLength={15} rows={4} /></label>
              <button className="button button-gold form-submit" type="submit" disabled={formState === 'submitting'}>{formState === 'submitting' ? 'Sending enquiry' : 'Send enquiry'} <ArrowUpRight size={17} /></button>
              {formMessage && <p className={formState === 'error' ? 'form-feedback form-error' : 'form-feedback'} role="status" aria-live="polite">{formMessage}</p>}
              <small className="form-privacy">{siteConfig.contactEndpoint ? 'Your enquiry is sent to the configured secure endpoint.' : 'Online submissions are not enabled yet. A verified secure enquiry endpoint must be configured before this form can accept enquiries.'}</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className={socialItems.some(item => item.url) ? 'footer-main has-social' : 'footer-main'}><a className="footer-brand" href="#top">ZENTARO</a><p>Engineering intelligence.<br />Building what’s next.</p>{socialItems.some(item => item.url) && <div className="footer-social"><span>Connect</span>{socialItems.filter(item => item.url).map(item => { const Icon = item.Icon; return <a key={item.key} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}><Icon size={16} /></a> })}</div>}</div>
        <div className="footer-bottom"><a href="#faq">FAQ</a><a href="#contact">Careers and enquiries</a><span>© {new Date().getFullYear()} ZENTARO TECHNOLOGIES. ALL RIGHTS RESERVED.</span><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a><span>ASIA / COLOMBO · UTC+05:30</span></div>
      </footer>
    </div>
  )
}

export default App
