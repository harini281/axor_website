import { lazy, Suspense, useMemo, useState, type FormEvent } from 'react'
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
  { n: '01', icon: BrainCircuit, title: 'AI-powered applications', line: 'Make intelligence part of the product.', detail: 'Design and develop applications that use AI to make experiences more useful, workflows more adaptive and decisions more informed.', capabilities: ['LLM-powered product features', 'Knowledge assistants and retrieval', 'Computer vision integrations'], value: 'Create differentiated digital experiences and bring practical intelligence closer to your users.' },
  { n: '02', icon: Code2, title: 'Custom software development', line: 'Software shaped around your operation.', detail: 'Build dependable platforms, APIs and business systems around the processes that make your organisation unique.', capabilities: ['Backend and API engineering', 'Cloud-ready application architecture', 'System integration and modernization'], value: 'Replace disconnected tools and manual work with software designed for the way your business runs.' },
  { n: '03', icon: Network, title: 'AI agents & intelligent automation', line: 'Move repetitive work into reliable flows.', detail: 'Connect tools, information and well-defined actions into workflows that help people spend more time on meaningful work.', capabilities: ['Agentic workflow design', 'Business process automation', 'Human-in-the-loop controls'], value: 'Reduce repetitive effort while keeping people informed and in control.' },
  { n: '04', icon: Layers3, title: 'Machine learning solutions', line: 'Turn patterns into useful predictions.', detail: 'Explore, prepare and model data to support forecasting, classification, recommendation and other decision-support needs.', capabilities: ['Model development and evaluation', 'Feature engineering', 'Deployment and monitoring foundations'], value: 'Make better use of available data with models evaluated against the problem they are meant to solve.' },
  { n: '05', icon: Database, title: 'Data science & analytics', line: 'Give your data a clearer direction.', detail: 'Create trusted data foundations and analytical experiences that help teams understand what is happening and why.', capabilities: ['Data preparation and pipelines', 'Dashboards and business intelligence', 'Exploratory and statistical analysis'], value: 'Move from scattered information to clearer operational and strategic decisions.' },
  { n: '06', icon: Smartphone, title: 'Web & mobile applications', line: 'Useful experiences, across devices.', detail: 'Deliver accessible, responsive web and mobile products with a focus on clarity, performance and maintainability.', capabilities: ['Responsive web applications', 'Cross-platform mobile experiences', 'UX engineering and integrations'], value: 'Give customers and teams a consistent digital experience wherever they work.' },
  { n: '07', icon: Sparkles, title: 'AI consulting', line: 'Find the right problem before the tool.', detail: 'Assess opportunities, constraints and readiness to build a practical roadmap for adopting AI responsibly.', capabilities: ['AI opportunity discovery', 'Solution feasibility and architecture', 'Adoption and implementation roadmaps'], value: 'Invest in technology with a clear purpose, realistic scope and a path to delivery.' },
]

const technologyGroups = [
  { category: 'AI & MACHINE LEARNING', tools: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LLM integration', 'Computer Vision'] },
  { category: 'APPLICATION ENGINEERING', tools: ['React', 'TypeScript', 'Node.js', 'ASP.NET Core', 'REST APIs', 'Flutter'] },
  { category: 'DATA & PLATFORMS', tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Power BI', 'ETL pipelines', 'Cloud services'] },
  { category: 'ENGINEERING & DELIVERY', tools: ['Docker', 'GitHub Actions', 'CI/CD', 'Automated testing', 'API security', 'Observability'] },
]

const axorPrinciples = [
  { number: '01', quote: 'Technology is only intelligent when it makes life or work meaningfully better.', label: 'PURPOSE BEFORE COMPLEXITY' },
  { number: '02', quote: 'Build with curiosity. Engineer with discipline. Improve with evidence.', label: 'HOW WE WORK' },
  { number: '03', quote: 'The future belongs to teams that turn ambitious ideas into dependable systems.', label: 'WHAT WE BELIEVE' },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [formState, setFormState] = useState<'idle' | 'ready'>('idle')
  const reducedMotion = useReducedMotion()
  const navItems = useMemo(() => [
    ['About', '#about'], ['Services', '#services'], ['Industries', '#industries'], ['Technology', '#technology'], ['Our Work', '#work'], ['Insights', '#insights'],
  ], [])

  const whatsappUrl = (message: string) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const service = String(data.get('service') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const budget = String(data.get('budget') ?? '').trim()
    const timeline = String(data.get('timeline') ?? '').trim()
    const message = [
      'Hello AXOR Technologies, I would like to discuss a project.',
      `Name: ${name}`, `Business email: ${email}`, `Company: ${company || 'Not provided'}`,
      `Service of interest: ${service}`, `Budget: ${budget || 'Not provided'}`, `Timeline: ${timeline || 'Not provided'}`, `Project description: ${description}`,
    ].join('\n')
    setFormState('ready')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AXOR Technologies home">
          <img src="/images/axor-logo.jpg" alt="AXOR emblem" />
          <span><b>AXOR</b><small>TECHNOLOGIES</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s Talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={reveal}>
              <div className="eyebrow"><span /> AI-FIRST TECHNOLOGY COMPANY</div>
              <h1>Engineering<br /><em>Intelligence.</em><br />Building What’s Next<span className="gold-dot">.</span></h1>
              <p className="hero-lede">We bring software engineering, AI, cybersecurity, cloud and digital growth together to help businesses innovate, automate operations, strengthen security and scale with confidence.</p>
              <div className="hero-actions">
                <a className="button button-gold" href="#services">Explore Capabilities <ArrowUpRight size={17} /></a>
                <a className="text-link" href="#contact">Discuss a Project <ArrowDownRight size={17} /></a>
              </div>
            </motion.div>
          </div>
          <div className="hero-visual">
            <Suspense fallback={<div className="scene-fallback"><span>AX</span><small>ENGINEERING INTELLIGENCE</small></div>}>
              <HeroScene />
            </Suspense>
            <div className="hero-visual-index">FIG. 01 <span>INTELLIGENT SYSTEMS</span></div>
          </div>
          <div className="hero-bottom"><span>STRATEGY · ENGINEERING · INTELLIGENCE</span><a href="#about">DISCOVER AXOR <ArrowDown size={13} /></a></div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-index">01 / ABOUT AXOR</div>
          <div className="intro-content">
            <h2>Technology should<br />create <em>possibility.</em></h2>
            <div className="intro-aside">
              <p>AXOR Technologies is an AI-first technology company focused on intelligent software, automation and digital solutions. We bring business context and engineering together to make complex challenges more approachable.</p>
              <p className="muted">Thoughtful by design. Practical in execution. Built to evolve.</p>
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
            <div><div className="section-index">02 / OUR CAPABILITIES</div><h2>Technology that<br /><em>moves work forward.</em></h2></div>
            <p>We focus on the business challenge first, then bring the right combination of engineering, data and AI to address it.</p>
          </div>
          <div className="services-experience">
            <div className="service-selector" role="tablist" aria-label="AXOR services">
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
                <span className="detail-kicker">{s.n} / {s.title.toUpperCase()}</span>
                <h3>{s.line}</h3><p className="detail-description">{s.detail}</p>
                <div className="detail-columns"><div><b>TECHNICAL CAPABILITIES</b>{s.capabilities.map(item => <span key={item}><CheckCircle2 size={14} />{item}</span>)}</div><div><b>BUSINESS VALUE</b><p>{s.value}</p></div></div>
                <a className="detail-link" href="#contact">Discuss this capability <ArrowUpRight size={16} /></a>
              </> })()}
            </motion.div>
          </div>
        </section>

        <section className="industries section-pad" id="industries">
          <div className="section-heading">
            <div><div className="section-index">03 / INDUSTRIES</div><h2>Technology shaped<br /><em>around your world.</em></h2></div>
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

        <section className="technology section-pad" id="technology">
          <div className="section-heading">
            <div><div className="section-index">03 / OUR TECHNOLOGY LANDSCAPE</div><h2>The right tools.<br /><em>Thoughtfully applied.</em></h2></div>
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
              <Suspense fallback={<div className="ambient-fallback">AXOR / SYSTEMS</div>}>
                <AmbientScene variant="intelligence" />
              </Suspense>
              <div className="object-caption"><span>FIG. 02 / INTELLIGENCE CORE</span><b>Systems that connect.<br />Ideas that compound.</b></div>
            </div>
          </div>
          <p className="technology-note">Our stack is selected case by case, with attention to maintainability, security, performance and long-term fit.</p>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="section-index">03 / OUR APPROACH</div>
          <div className="approach-layout">
            <h2>Clarity first.<br /><em>Engineering</em><br />always.</h2>
            <div className="approach-copy"><p className="large-copy">The strongest technology begins with a clear understanding of the challenge.</p><p>We work from discovery through delivery with an emphasis on useful outcomes, considered architecture and responsible implementation.</p>
              <div className="process-list"><div><span>01</span><b>Discover</b><small>Understand the people, context and problem.</small></div><div><span>02</span><b>Define</b><small>Shape a practical scope and technical direction.</small></div><div><span>03</span><b>Engineer</b><small>Build, integrate and validate the solution.</small></div><div><span>04</span><b>Evolve</b><small>Prepare the product to learn and grow.</small></div></div>
            </div>
          </div>
          <div className="approach-values"><div><ShieldCheck /><b>Security-minded</b><span>Considered from the beginning.</span></div><div><Fingerprint /><b>Human-centred</b><span>Designed around real people.</span></div><div><Globe2 /><b>Built to scale</b><span>Ready for changing needs.</span></div></div>
          <div className="approach-visual">
            <div className="approach-visual-copy"><span>ENGINEERING IN LAYERS</span><b>From a clear foundation<br />to a connected system.</b><small>Architecture · Integration · Validation · Evolution</small></div>
            <Suspense fallback={<div className="ambient-fallback">STRUCTURE / 03</div>}>
              <AmbientScene variant="architecture" />
            </Suspense>
            <span className="approach-visual-index">AXOR / ENGINEERING MODEL 03</span>
          </div>
        </section>

        <section className="leadership section-pad" id="leadership">
          <div className="section-heading">
            <div><div className="section-index">04 / FOUNDING LEADERSHIP</div><h2>Meet the Minds<br /><em>Behind AXOR.</em></h2></div>
            <p>Three perspectives. One vision. Building intelligent technology for tomorrow.</p>
          </div>
          <div className="leadership-grid">
            {leadership.map((person, index) => <motion.article className="leader-card" key={person.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} whileHover={reducedMotion ? undefined : { y: -7, rotateX: 1.5 }}>
              <div className={`leader-portrait portrait-${index + 1}`}><img className={`leader-photo leader-photo-${index + 1}`} src={person.portrait} alt={`${person.name}, ${person.role} of AXOR Technologies`} /></div>
              <div className="leader-info"><div className="leader-role">{person.role}</div><h3>{person.name}</h3><p>{person.intro}</p><div className="leader-focus"><b>AREA OF FOCUS</b><span>{person.focus}</span></div>
                {person.linkedin ? <a className="leader-social" href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}><Linkedin size={16} /></a> : <span className="leader-social unavailable" title="LinkedIn profile not configured"><Linkedin size={16} /></span>}
              </div>
            </motion.article>)}
          </div>
          <p className="portrait-note">AXOR Technologies was founded by this leadership team: three co-founders bringing together business, technology and information security.</p>
        </section>

        <section className="beliefs section-pad" id="beliefs">
          <div className="section-index">05 / THE AXOR MINDSET</div>
          <div className="beliefs-heading"><h2>Ideas are easy.<br /><em>Execution is everything.</em></h2><p>These are original AXOR principles—not customer testimonials or quotations attributed to external people.</p></div>
          <div className="belief-grid">
            {axorPrinciples.map(item => <article key={item.number}><span>{item.number} / {item.label}</span><blockquote>“{item.quote}”</blockquote><small>— THE AXOR PRINCIPLES</small></article>)}
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><div className="section-index">05 / PROJECT EXPLORATIONS</div><h2>Ideas made<br /><em>tangible.</em></h2></div>
            <p>A preview of the kinds of challenges and solution patterns AXOR is equipped to explore. These are concept demonstrations, not client case studies.</p>
          </div>
          <div className="work-visual-band">
            <div><span>PROTOTYPE / EXPLORATION</span><b>Turning abstract challenges<br />into tangible systems.</b></div>
            <Suspense fallback={<div className="ambient-fallback">AXOR / LAB</div>}>
              <AmbientScene variant="orbit" />
            </Suspense>
            <span className="work-visual-index">INTERACTIVE STUDIES · 001—003</span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <motion.article className={`project-card project-${index + 1}`} key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} whileHover={reducedMotion ? undefined : { y: -8, rotateX: 2, rotateY: index === 1 ? -1.5 : 1.5 }}>
              <div className="project-art"><div className="project-art-core">{index === 0 ? <BrainCircuit /> : index === 1 ? <Network /> : <Database />}</div><span>AXOR / CONCEPT 0{index + 1}</span><div className="project-art-orbit" /></div>
              <div className="project-meta"><span>{project.type}</span><small>{project.label}</small></div><h3>{project.title}</h3><p>{project.desc}</p>
            </motion.article>)}
          </div>
        </section>

        <section className="insights section-pad" id="insights">
          <div className="section-heading">
            <div><div className="section-index">07 / INSIGHTS & KNOWLEDGE</div><h2>Ideas worth<br /><em>thinking through.</em></h2></div>
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
          <div className="section-heading"><div><div className="section-index">08 / FAQ</div><h2>Good questions.<br /><em>Clear answers.</em></h2></div><p>A few useful starting points before beginning a conversation with AXOR.</p></div>
          <div className="faq-list">
            <details><summary>What kind of work does AXOR take on?</summary><p>AXOR’s capability areas include intelligent systems, software and application engineering, data and analytics, cybersecurity, cloud and infrastructure, digital growth, and design and consulting.</p></details>
            <details><summary>How does a project usually begin?</summary><p>We begin by understanding the business context, users, objectives and constraints. From there, scope and a suitable technical direction can be discussed.</p></details>
            <details><summary>Can I enquire about only one service?</summary><p>Yes. You can select a specific service in the enquiry form and describe the challenge or outcome you have in mind.</p></details>
            <details><summary>Does AXOR publish client results and testimonials?</summary><p>Only verified and approved project information should be published. Demonstrations and internal initiatives are labelled separately from client engagements.</p></details>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="section-index">06 / CONNECT WITH AXOR</div>
          <div className="contact-layout">
            <div className="contact-copy"><h2>Have an ambitious idea?<br /><em>Let’s build it.</em></h2><p>Tell us about the challenge you’re trying to solve. Let’s explore how intelligent technology can move your business forward.</p>
              <div className="availability"><span className="availability-dot" /><div><b>CONSULTATION AVAILABILITY</b><span>Available for project discussions and consultations after 7:00 PM (Sri Lanka Time · Asia/Colombo).</span></div></div>
              <div className="contact-direct"><a href={whatsappUrl('Hello AXOR Technologies, I would like to start a conversation.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WHATSAPP</small><b>{siteConfig.whatsappDisplay}</b></span><ArrowUpRight size={16} /></a>
                {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}><ArrowUpRight size={18} /><span><small>EMAIL</small><b>{siteConfig.contactEmail}</b></span></a> : <div className="email-unset"><MessageCircle size={18} /><span><small>EMAIL</small><b>Company email to be configured</b></span></div>}
              </div>
            </div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <div className="form-heading"><span>PROJECT ENQUIRY</span><small>Tell us a little about your idea.</small></div>
              <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required minLength={2} /></label>
              <label>Business email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <label>Company <span className="optional">OPTIONAL</span><input name="company" autoComplete="organization" placeholder="Your organisation" /></label>
              <label>Service of interest<select name="service" required defaultValue=""><option value="" disabled>Select a capability</option>{services.map(service => <option key={service.n}>{service.title}</option>)}</select></label>
              <label>Project budget <span className="optional">OPTIONAL</span><select name="budget" defaultValue=""><option value="">Not decided yet</option><option>Under USD 1,000</option><option>USD 1,000–5,000</option><option>USD 5,000–15,000</option><option>USD 15,000+</option><option>Prefer to discuss</option></select></label>
              <label>Expected timeline <span className="optional">OPTIONAL</span><select name="timeline" defaultValue=""><option value="">Not decided yet</option><option>Immediately</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Exploring / planning</option></select></label>
              <label>Project description<textarea name="description" placeholder="What are you looking to build or improve?" required minLength={15} rows={4} /></label>
              <button className="button button-gold form-submit" type="submit">Continue via WhatsApp <ArrowUpRight size={17} /></button>
              {formState === 'ready' && <p className="form-feedback"><CheckCircle2 size={15} /> Your message is prepared. Complete sending it in WhatsApp.</p>}
              <small className="form-privacy">Your form details are passed into a WhatsApp message. This website does not currently store enquiries.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main"><a className="footer-brand" href="#top">AXOR<span>.</span></a><p>Engineering intelligence.<br />Building what’s next.</p><div className="footer-social"><span>CONNECT</span>{socialItems.map(item => { const Icon = item.Icon; return item.url ? <a key={item.key} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}><Icon size={15} /></a> : <span className="social-disabled" key={item.key} title={`${item.label} profile not configured`} aria-label={`${item.label} profile not configured`}><Icon size={15} /></span> })}</div></div>
        <div className="footer-bottom"><a href="#faq">FAQ</a><a href="#contact">Careers & enquiries</a><span>© {new Date().getFullYear()} AXOR TECHNOLOGIES. ALL RIGHTS RESERVED.</span><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a><span>ASIA / COLOMBO · UTC+05:30</span></div>
      </footer>
    </div>
  )
}

export default App
