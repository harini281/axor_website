import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit,
  CheckCircle2, ChevronRight, Code2, Database, Fingerprint, Globe2, Layers3,
  Menu, MessageCircle, Network, ShieldCheck, Sparkles, X, Linkedin, Github, Instagram, Facebook,
} from 'lucide-react'
import { leadership, siteConfig } from './config/site'

const HeroScene = lazy(() => import('./components/HeroScene'))

const services = [
  { n: '01', icon: BrainCircuit, title: 'AI & Intelligent Systems', line: 'Turn knowledge and repetitive work into useful intelligence', detail: 'When teams spend too much time searching for information or repeating the same steps, AI can help in carefully chosen places. We shape AI-enabled product features and workflows around real business context, with human review wherever judgement matters.', capabilities: ['LLM-powered product features and knowledge assistants', 'AI agents and human-reviewed workflow automation', 'Machine learning and computer vision applications'], value: 'Help people find relevant information, reduce avoidable manual steps and make more consistent decisions—without treating automation as a substitute for human judgement.' },
  { n: '02', icon: Code2, title: 'Software Engineering', line: 'Build digital products around the way people work', detail: 'Off-the-shelf tools do not always fit the way a business operates. We design and engineer web, mobile and backend applications around the users, workflows and integrations that matter to the product.', capabilities: ['Web and mobile application development', 'Backend services, APIs and system integrations', 'Application architecture, testing and modernisation'], value: 'Create software that is easier to use, maintain and extend as the organisation and its requirements change.' },
  { n: '03', icon: Database, title: 'Data & Analytics', line: 'Make operational data easier to understand and use', detail: 'Useful information often sits across disconnected systems, spreadsheets and databases. We help organise data, create clear reporting foundations and present information in ways people can act on.', capabilities: ['Data preparation, modelling and engineering', 'Business intelligence dashboards and reporting', 'Exploratory analysis and decision-support views'], value: 'Give teams a clearer picture of what is happening, where attention is needed and which questions to investigate next.' },
  { n: '04', icon: ShieldCheck, title: 'Cybersecurity', line: 'Build security into the product from the beginning', detail: 'Security is most useful when it is considered before a system goes live—not added as an afterthought. We bring security-minded practices into application design, integrations, access and data handling.', capabilities: ['Secure application and API design practices', 'Identity, access and data-protection foundations', 'Risk-aware development and security reviews'], value: 'Make security considerations visible throughout delivery and reduce avoidable weaknesses in digital systems.' },
  { n: '05', icon: Layers3, title: 'Cloud & DevOps', line: 'Make software delivery more repeatable and dependable', detail: 'Manual releases and unclear environments make software harder to operate. We help teams establish cloud-ready foundations and delivery workflows that support consistent deployment and ongoing improvement.', capabilities: ['Cloud-ready application and infrastructure design', 'Containers, CI/CD and deployment automation', 'Monitoring, environment management and operational practices'], value: 'Improve release consistency and make applications easier to deploy, observe and maintain.' },
  { n: '06', icon: Globe2, title: 'Digital Growth', line: 'Make your digital presence easier to find and use', detail: 'A digital presence should help the right people understand what a business offers and take a meaningful next step. We connect useful content, discoverability and experience improvements to clear business goals.', capabilities: ['Search visibility and SEO foundations', 'Content structure and digital channel planning', 'Analytics, usability and conversion improvements'], value: 'Build a stronger foundation for discovery and make digital channels easier to evaluate and improve over time.' },
  { n: '07', icon: Sparkles, title: 'Design & Consulting', line: 'Turn an early idea into a clear direction', detail: 'Before choosing a technology or writing code, teams need a shared understanding of the problem. We help clarify user needs, product priorities and technical options so the next step is grounded in context.', capabilities: ['Product discovery and requirements definition', 'User experience and interface design', 'Technology roadmaps and transformation planning'], value: 'Reduce uncertainty, align stakeholders and move forward with a solution that is useful, feasible and clearly scoped.' },
]

const technologyGroups = [
  { category: 'AI and intelligent systems', tools: ['Python', 'Scikit-learn', 'LLM integration', 'Computer vision'] },
  { category: 'Application engineering', tools: ['React', 'TypeScript', 'Node.js', 'ASP.NET Core', 'REST APIs', 'Flutter'] },
  { category: 'Data and analytics', tools: ['PostgreSQL', 'MongoDB', 'Power BI', 'ETL pipelines'] },
  { category: 'Security and delivery', tools: ['API security', 'Docker', 'GitHub Actions', 'CI/CD', 'Cloud services', 'Monitoring'] },
]


const principles = [
  { number: '01', kanji: '改善', name: 'Kaizen', title: 'Continuous Improvement', description: 'Small, consistent improvements create stronger systems. We learn from feedback, review what works and make each iteration more useful.', application: 'Learning, iteration and ongoing product improvement.' },
  { number: '02', kanji: 'こだわり', name: 'Kodawari', title: 'Care in the Details', description: 'We pay attention to the details that shape usability, reliability and maintainability. Quality comes from deliberate choices, not decoration.', application: 'Thoughtful design and engineering quality.' },
  { number: '03', kanji: '絆', name: 'Kizuna', title: 'Connection & Trust', description: 'Good work depends on trust. We listen carefully, share context early and work with clients and teammates as one connected team.', application: 'Clear communication and collaborative delivery.' },
  { number: '04', kanji: '我慢', name: 'Gaman', title: 'Resilience & Perseverance', description: 'Complex work rarely moves in a straight line. We stay patient, work through constraints and keep making considered progress.', application: 'Steady problem-solving through difficult challenges.' },
]

const projects = [
  { type: 'AI & KNOWLEDGE', title: 'A context-aware knowledge assistant', desc: 'Concept: connect selected information sources so people can find relevant answers, understand where information came from and keep human review in the loop.', label: 'Concept demonstration' },
  { type: 'WORKFLOW AUTOMATION', title: 'A human-reviewed workflow', desc: 'Concept: guide repeatable tasks through clear stages, surface exceptions and keep important decisions visible to the people responsible.', label: 'Concept demonstration' },
  { type: 'DATA & ANALYTICS', title: 'An operational insight dashboard', desc: 'Concept: bring selected measures into one view, make patterns easier to spot and let teams investigate the context behind the numbers.', label: 'Concept demonstration' },
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
    ['Home', '#top'], ['About', '#about'], ['Capabilities', '#capabilities'], ['Industries', '#industries'], ['Our Work', '#work'], ['Technology', '#technology'], ['Insights', '#insights'], ['Contact', '#contact'],
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
          <img className="brand-mark" src="/images/zentaro-mark.webp" alt="ZENTARO Technologies logo" width="72" height="50" loading="eager" decoding="async" />
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
              <div className="eyebrow"><span /> Build with curiosity. Lead with purpose. Evolve without limits.</div>
              <h1>Engineering <em>Intelligence.</em><br />Building What's Next.</h1>
              <p className="hero-lede">From intelligent software and automation to secure digital platforms, we turn business challenges into useful products and dependable systems.</p>
              <p className="hero-brand-promise">Engineering Intelligence. Building What’s Next.</p>
              <div className="hero-actions">
                <a className="button button-gold" href="#capabilities">Explore Capabilities <ArrowUpRight size={17} /></a>
                <a className="text-link" href="#contact">Discuss a Project <ArrowDownRight size={17} /></a>
              </div>
            </motion.div>
          </div>
          <div className="hero-visual">
            <Suspense fallback={<div className="scene-fallback"><img src="/images/zentaro-mark.webp" alt="ZENTARO logo" /><small>ENGINEERING INTELLIGENCE</small></div>}>
              <HeroScene reducedMotion={Boolean(reducedMotion)} />
            </Suspense>
            <div className="hero-visual-index">Figure 01 <span>Interconnected systems</span></div>
          </div>
          <div className="hero-bottom"><span>Business context · Engineering · Intelligent systems</span><a href="#about">Discover Zentaro <ArrowDown size={13} /></a></div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-index">01 / ABOUT ZENTARO</div>
          <div className="intro-content">
            <h2>Built around<br />what matters <em>next.</em></h2>
            <div className="intro-aside">
              <p>Zentaro Technologies brings together software engineering, applied AI, data, cybersecurity, cloud and digital experience. We start with the problem behind the brief, then shape a solution around the people, processes and goals it needs to serve.</p>
              <p className="muted">Practical by design. Responsible in delivery. Ready to evolve.</p>
            </div>
          </div>
          <div className="principle-strip"><span>01 — UNDERSTAND THE PROBLEM</span><span>02 — ENGINEER THE SOLUTION</span><span>03 — BUILD FOR WHAT’S NEXT</span></div>
          <motion.div className="vision-mission" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <article><span>OUR VISION</span><h3>A future where technology helps people and organisations move forward with confidence.</h3><p>We want intelligent, well-designed technology to make useful work easier, strengthen connections and open up new possibilities.</p></article>
            <article><span>OUR MISSION</span><h3>Make complex challenges easier to solve through thoughtful engineering.</h3><p>We bring people, processes and technology into the same conversation—then design and build digital solutions with a clear purpose.</p></article>
          </motion.div>
        </section>

        <section className="principles section-pad" id="principles">
          <div className="section-index">02 / OUR PHILOSOPHY</div>
          <div className="principles-heading">
            <h2>How we work<br /><em>matters.</em></h2>
            <p>These four ideas give our work its character. They shape how we improve, how carefully we engineer, how we work with people and how we respond when the problem gets difficult.</p>
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

        <section className="capabilities section-pad" id="capabilities">
          <div className="section-heading">
            <div><div className="section-index">03 / CAPABILITIES</div><h2>Solve the right problem.<br /><em>Build what fits.</em></h2></div>
            <p>From a focused feature to a connected platform, we combine the disciplines needed to design, build and improve digital systems.</p>
          </div>
          <div className="services-experience">
            <div className="service-selector" role="tablist" aria-label="Zentaro service capabilities">
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
            <div><div className="section-index">04 / INDUSTRIES</div><h2>Technology shaped<br /><em>around real work.</em></h2></div>
            <p>The same technology rarely fits every sector. We look at the workflows, information needs and operating constraints behind each organisation before shaping an approach.</p>
          </div>
          <div className="industry-grid">
            {[
              ['01','Banking & financial services','Customer portals, internal workflows, secure integrations and reporting.'],
              ['02','Healthcare & life sciences','Patient-facing experiences, appointment workflows and carefully managed information.'],
              ['03','Education & EdTech','Learning platforms, student portals, digital assessments and administration tools.'],
              ['04','Retail & e-commerce','Online shopping journeys, inventory visibility and customer-facing services.'],
              ['05','Manufacturing','Production workflows, operational dashboards and connected business data.'],
              ['06','Agriculture & food technology','Farm and supply-chain applications, monitoring workflows and traceability tools.'],
              ['07','Professional services','Client portals, service websites, document workflows and business automation.'],
              ['08','Startups & SMEs','MVPs, product foundations, integrations and practical technology roadmaps.'],
            ].map(([n,title,desc]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}
          </div>
          <p className="section-footnote">Illustrative areas of application—not a claim of existing sector clients.</p>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><div className="section-index">05 / OUR WORK</div><h2>Ideas shaped into<br /><em>working concepts.</em></h2></div>
            <p>These concept demonstrations show how we think through product and workflow problems. They are examples of possible solutions—not client case studies or claims of deployed results.</p>
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
            <div><div className="section-index">06 / TECHNOLOGY LANDSCAPE</div><h2>A considered stack.<br /><em>For the problem at hand.</em></h2></div>
            <p>We choose tools around product requirements, integrations, team capabilities and the environment a system needs to run in. These are technologies we work across—not a fixed stack for every project.</p>
          </div>
          <div className="technology-showcase">
            <div className="technology-grid">
              {technologyGroups.map((group, index) => <motion.article className="technology-group" key={group.category} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ delay: index * 0.07 }}>
                <div className="technology-number">0{index + 1}</div><h3>{group.category}</h3>
                <div className="technology-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
              </motion.article>)}
            </div>
            
          </div>
          <p className="technology-note">The goal is not to use the newest tool. It is to choose a dependable combination that fits the product and can be maintained over time.</p>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="section-index">07 / OUR APPROACH</div>
          <div className="approach-layout">
            <h2>Understand first.<br /><em>Build with</em><br />intent.</h2>
            <div className="approach-copy"><p className="large-copy">Good engineering starts before the first line of code.</p><p>We make the problem clear, agree on a practical scope, build in manageable steps and validate the result against the need that started the work.</p>
              <div className="process-list"><div><span>01</span><b>Discover</b><small>Listen to users, understand the workflow and define the real need.</small></div><div><span>02</span><b>Define</b><small>Agree on priorities, constraints and a suitable technical approach.</small></div><div><span>03</span><b>Engineer</b><small>Develop, connect and test the parts that make the product work.</small></div><div><span>04</span><b>Evolve</b><small>Review what is working and identify the next useful improvement.</small></div></div>
            </div>
          </div>
          <div className="approach-values"><div><ShieldCheck /><b>Security-minded</b><span>Considered from the beginning.</span></div><div><Fingerprint /><b>Human-centred</b><span>Designed around real people.</span></div><div><Globe2 /><b>Built to scale</b><span>Designed to evolve.</span></div></div>
        </section>

        

        

        

        <section className="leadership section-pad" id="leadership">
          <div className="section-heading">
            <div><div className="section-index">08 / FOUNDING LEADERSHIP</div><h2>The people<br /><em>behind Zentaro.</em></h2></div>
            <p>A founder-led team spanning business direction, product engineering and information security.</p>
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
            <div><div className="section-index">09 / INSIGHTS</div><h2>Questions worth<br /><em>exploring.</em></h2></div>
            <p>We are building a practical knowledge library around the decisions businesses and product teams face as they adopt AI, design software and connect their systems.</p>
          </div>
          <div className="insight-grid">
            {[
              ['AI & INTELLIGENT SYSTEMS','Where can AI remove friction—and where should a person stay in control? We explore useful assistants, agents, machine learning and responsible automation.'],
              ['SOFTWARE ENGINEERING','How do teams build systems that remain understandable as they grow? We examine architecture, APIs, testing, integration and maintainability.'],
              ['SECURITY & CLOUD','What makes a digital system dependable? We look at secure development, access, cloud foundations, deployment and operational resilience.'],
              ['DATA & DIGITAL GROWTH','How can information and digital experiences support better decisions? We explore analytics, discoverability, user journeys and practical transformation.'],
            ].map(([title,desc],i)=><article key={title}><span>TOPIC / 0{i+1}</span><h3>{title}</h3><p>{desc}</p><small>Perspective theme · Articles will be added after editorial review.</small></article>)}
          </div>
        </section>

        

        <section className="contact section-pad" id="contact">
          <div className="section-index">10 / CONTACT</div>
          <div className="contact-layout">
            <div className="contact-copy"><h2>Have a challenge<br /><em>worth solving?</em></h2><p>Share what you are trying to improve, build or understand. We will use that context to explore whether there is a useful next step together.</p>
              <div className="contact-note"><p>A useful first conversation starts with three things: what is happening today, where it gets in the way, and what a better outcome would look like.</p></div>
              <div className="contact-direct">
                {siteConfig.whatsappNumber && siteConfig.whatsappDisplay ? <a href={whatsappUrl('Hello Zentaro Technologies, I would like to start a conversation.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WhatsApp</small><b>{siteConfig.whatsappDisplay}</b></span><ArrowUpRight size={16} /></a> : null}
                {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}><ArrowUpRight size={18} /><span><small>Email</small><b>{siteConfig.contactEmail}</b></span></a> : null}
              </div>
            </div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <div className="form-heading"><span>PROJECT ENQUIRY</span><small>A little context helps us understand what you need.</small></div>
              <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required minLength={2} /></label>
              <label>Business email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <label>Company or organisation<input name="company" autoComplete="organization" placeholder="Your organisation" required /></label>
              <label>Service of interest<select name="service" required value={selectedService} onChange={(event) => setSelectedService(event.currentTarget.value)}><option value="" disabled>Select a capability</option>{services.map(service => <option key={service.n} value={service.title}>{service.title}</option>)}</select></label>
              <label>Project budget <span className="optional">OPTIONAL</span><select name="budget" defaultValue=""><option value="">Not decided yet</option><option value="Below LKR 350,000">Below LKR 350,000</option><option value="LKR 350,000–1,650,000">LKR 350,000–1,650,000</option><option value="LKR 1,650,001–5,000,000">LKR 1,650,001–5,000,000</option><option value="Above LKR 5,000,000">Above LKR 5,000,000</option><option value="Prefer to discuss">Prefer to discuss</option></select></label>
              <label>Expected timeline <span className="optional">OPTIONAL</span><select name="timeline" defaultValue=""><option value="">Not decided yet</option><option>Immediately</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Exploring / planning</option></select></label>
              <label>Project description<textarea name="description" placeholder="What is happening today, and what would you like to change?" required minLength={15} rows={4} /></label>
              <button className="button button-gold form-submit" type="submit" disabled={formState === 'submitting'}>{formState === 'submitting' ? 'Sending enquiry' : 'Send enquiry'} <ArrowUpRight size={17} /></button>
              {formMessage && <p className={formState === 'error' ? 'form-feedback form-error' : 'form-feedback'} role="status" aria-live="polite">{formMessage}</p>}
              <small className="form-privacy">{siteConfig.contactEndpoint ? 'Your enquiry is sent to the configured secure endpoint.' : 'Online submissions are not enabled yet. A verified secure enquiry endpoint must be configured before this form can accept enquiries.'}</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className={socialItems.some(item => item.url) ? 'footer-main has-social' : 'footer-main'}><a className="footer-brand" href="#top" aria-label="ZENTARO Technologies home"><img src="/images/zentaro-mark.webp" alt="ZENTARO Technologies official logo" width="72" height="50" loading="eager" decoding="async" /></a><p>Engineering intelligence.<br />Building what’s next.</p>{socialItems.some(item => item.url) && <div className="footer-social"><span>Connect</span>{socialItems.filter(item => item.url).map(item => { const Icon = item.Icon; return <a key={item.key} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}><Icon size={16} /></a> })}</div>}</div>
        <div className="footer-bottom"><a href="#capabilities">Capabilities</a><a href="#contact">Start a conversation</a><span>© {new Date().getFullYear()} ZENTARO TECHNOLOGIES. ALL RIGHTS RESERVED.</span><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a><span>ASIA / COLOMBO · UTC+05:30</span></div>
      </footer>
    </div>
  )
}

export default App
