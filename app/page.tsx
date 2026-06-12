'use client'

import { useEffect, useState } from 'react'

function PlayIntroBtn() {
  const [played, setPlayed] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (played) return
    const audio = new Audio('/intro.mp3')
    audio.volume = 1
    audio.play().catch(e => console.log(e))
    setPlaying(true)
    setPlayed(true)
    audio.onended = () => setPlaying(false)
  }

  return (
    <div style={{
      position:'fixed',
      right:36,
      top:'60%',
      transform:'translateY(-60%)',
      zIndex:150,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      gap:8,
    }}>
      <button
        onClick={handlePlay}
        title="Play intro"
        style={{
          width:52,
          height:52,
          borderRadius:'50%',
          background: played ? 'rgba(240,237,232,0.08)' : 'rgba(240,237,232,0.12)',
          border:'1px solid rgba(240,237,232,0.2)',
          color:'var(--fg)',
          fontSize:20,
          cursor: played ? 'default' : 'pointer',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          backdropFilter:'blur(10px)',
          transition:'all 0.3s ease',
          boxShadow: played ? 'none' : '0 0 20px rgba(240,237,232,0.08)',
        }}
      >
        {playing ? '🔊' : played ? '✓' : '▶'}
      </button>
      <span style={{
        fontSize:10,
        color:'var(--muted2)',
        letterSpacing:'0.05em',
        textTransform:'uppercase',
        marginTop:4,
      }}>
        {playing ? 'playing' : played ? 'played' : 'intro'}
      </span>
    </div>
  )
}
function JobHuntTimer() {
  return (
    <section className="section reveal">
      <div style={{textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <div className="sec-tag" style={{margin:'0 auto 32px'}}><span className="sec-dot" /> Offer Received · NTT DATA 🎉</div>
        <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(32px,5vw,56px)',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:48,color:'var(--fg)'}}>
          Time without<br /><span style={{color:'var(--muted2)'}}>1st job offer.</span>
        </h2>
        <div style={{display:'flex',gap:16,justifyContent:'center',marginBottom:32,flexWrap:'wrap'}}>
          {[
            { label:'Hours', value: '1673' },
            { label:'Minutes', value: '11' },
            { label:'Seconds', value: '17' },
          ].map(item => (
            <div key={item.label} style={{
              background:'var(--bg3)',
              border:'1px solid var(--border)',
              borderRadius:16,
              padding:'32px 40px',
              minWidth:160,
              textAlign:'center',
              flex:'1',
              maxWidth:200,
            }}>
              <div style={{
                fontFamily:'Sora,sans-serif',
                fontSize:'clamp(40px,6vw,72px)',
                fontWeight:700,
                letterSpacing:'-0.05em',
                lineHeight:1,
                marginBottom:12,
                color:'var(--fg)',
                fontVariantNumeric:'tabular-nums',
              }}>{item.value}</div>
              <div style={{fontSize:13,color:'var(--muted)',letterSpacing:'0.05em',textTransform:'uppercase'}}>{item.label}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:13,color:'var(--muted2)',letterSpacing:'0.03em',fontStyle:'italic'}}>
          🎯 Timer stopped. The owner landed his first job.
        </p>
      </div>
    </section>
  )
}
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position:'fixed',
      top:0,
      left:0,
      width:`${progress}%`,
      height:'2px',
      background:'rgba(240,237,232,0.7)',
      zIndex:999,
      transition:'width 0.1s ease',
      pointerEvents:'none',
    }} />
  )
}

function CyclingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      display:'inline-block',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition:'opacity 0.4s ease, transform 0.4s ease',
    }}>
      {words[index]}
    </span>
  )
}

function TypingTerminal() {
  const lines = [
    { cmd: 'az group create --name CloudGuard-Sec-RG --location southindia', res: 'provisioningState: Succeeded' },
    { cmd: 'az network nsg rule create --name AllowMyIP --priority 100', res: 'provisioningState: Succeeded' },
    { cmd: 'az monitor log-analytics workspace create --workspace-name law-phase3', res: 'provisioningState: Succeeded' },
    { cmd: 'az monitor metrics alert create --name phase4-admin-change-alert', res: 'provisioningState: Succeeded' },
    { cmd: 'az role definition create --role-definition phase5-monitor-reader.json', res: 'roleType: CustomRole' },
    { cmd: 'az security pricing create --name VirtualMachines --tier Standard', res: 'Microsoft Defender: Enabled' },
  ]

  const [displayedLines, setDisplayedLines] = useState<{cmd: string, res: string}[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<'typing'|'response'|'pause'>('typing')

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(p => !p), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    if (currentLine >= lines.length) return
    if (phase === 'typing') {
      if (currentChar < lines[currentLine].cmd.length) {
        const t = setTimeout(() => setCurrentChar(c => c + 1), 28)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('response'), 300)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'response') {
      setDisplayedLines(prev => [...prev, { cmd: lines[currentLine].cmd, res: lines[currentLine].res }])
      setPhase('pause')
    }
    if (phase === 'pause') {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
        setPhase('typing')
      }, 600)
      return () => clearTimeout(t)
    }
  }, [phase, currentChar, currentLine])

  useEffect(() => {
    if (currentLine >= lines.length) {
      const t = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine(0)
        setCurrentChar(0)
        setPhase('typing')
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [currentLine])

  const currentCmd = currentLine < lines.length ? lines[currentLine].cmd.slice(0, currentChar) : ''

  return (
    <div style={{fontFamily:'monospace',fontSize:'11px',lineHeight:1.7}}>
      {displayedLines.map((l, i) => (
        <div key={i}>
          <div className="tl"><span className="p">$ </span><span className="c">{l.cmd}</span></div>
          <div className="tl"><span className="o"><span className="ok">{l.res}</span></span></div>
          <br/>
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="tl">
          <span className="p">$ </span>
          <span className="c">{currentCmd}</span>
          <span style={{opacity: showCursor ? 1 : 0, color:'rgba(240,237,232,0.7)'}}>▋</span>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [heroReady, setHeroReady] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    const t = setTimeout(() => setHeroReady(true), 100)
    return () => { observer.disconnect(); clearTimeout(t) }
  }, [])

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i)

  const faqs = [
    { q: 'What roles are you targeting?', a: 'Azure Cloud Engineer, Azure Administrator, Cloud Security, and GRC-adjacent roles in Bengaluru, Hyderabad, Chennai, or Coimbatore. Open to remote and hybrid positions.' },
    { q: 'What certifications do you hold?', a: 'Microsoft Certified: Azure Fundamentals (AZ-900) and AWS Certified Cloud Practitioner (AWS CCP). Currently targeting AZ-104 as the next milestone.' },
    { q: 'What is CloudGuard?', a: 'CloudGuard is my enterprise-grade Azure project covering 6 phases: secure networking, NSG hardening, Log Analytics monitoring with KQL, automated alerting, custom RBAC governance, Azure Policy, and Microsoft Defender for Cloud.' },
    { q: 'What is the CloudGuard IaC Pipeline project?', a: 'CloudGuard IaC Pipeline is my second Azure project — it automates the entire infrastructure deployment using Terraform and GitHub Actions CI/CD. Every push to GitHub triggers an automated pipeline that provisions Azure VNet, subnets, and NSG — eliminating manual portal clicks.' },
    { q: 'What is your notice period?', a: "Zero days — I'm available to join immediately. Currently based in Bengaluru and actively applying for cloud roles." },
    { q: 'How can I reach you?', a: 'Email me at prasanthp.080902@gmail.com or connect on LinkedIn at linkedin.com/in/prasanthpanneer. I typically respond within 24 hours.' },
  ]

  const ticker1 = ['Azure VNet','NSG Hardening','RBAC Governance','Log Analytics','KQL Queries','Microsoft Defender','Azure Policy','Azure Monitor','AZ-900 Certified','AWS CCP','Terraform','GitHub Actions','CI/CD Pipeline']
  const ticker2 = ['Azure Virtual Network','Network Security Groups','Azure Firewall','RBAC & IAM','Microsoft Defender for Cloud','Log Analytics Workspace','KQL','Azure Monitor','Terraform','GitHub Actions']
  const ticker3 = ['Azure Policy','Compliance Assessment','Azure AD','Managed Identities','ARM Templates','Azure CLI','Resource Groups','AZ-900','AWS CCP','CI/CD Pipeline','GitOps']

  const steps = [
    { n:1, icon:'🏗️', title:'Infrastructure Setup', desc:'Built VNet with public/private subnets, Storage Account, and Log Analytics Workspace from scratch on Azure Portal.' },
    { n:2, icon:'🔒', title:'Network Security', desc:'Configured NSG inbound rules with IP whitelisting (/32 CIDR), attached to private subnet, validated logs with KQL.' },
    { n:3, icon:'📊', title:'Security Monitoring & Log Analytics', desc:'Deployed dedicated Log Analytics Workspace, streamed Activity Logs, ran KQL queries to detect failed operations.' },
    { n:4, icon:'🚨', title:'Alerting & Incident Notifications', desc:'Set up Azure Monitor Alert Rules targeting admin error events with Action Groups for automated email notifications.' },
    { n:5, icon:'🛡️', title:'Security & Governance', desc:'Created custom RBAC role with least-privilege permissions and enforced mandatory resource tagging via Azure Policy.' },
    { n:6, icon:'🔍', title:'Defender for Cloud', desc:'Assessed Secure Score, investigated security recommendations, and mapped controls to Azure Security Benchmark.' },
    { n:7, icon:'⚙️', title:'Infrastructure as Code', desc:'Wrote Terraform configs (main.tf, vnet.tf, nsg.tf) to provision Azure Resource Group, VNet, subnets, and NSG — no manual portal clicks.' },
    { n:8, icon:'🔄', title:'CI/CD Pipeline Automation', desc:'Built GitHub Actions workflow triggering on every push — runs terraform init, plan, and apply automatically to Azure.' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#090909;--bg2:#111111;--bg3:#161616;--fg:#f0ede8;--muted:rgba(240,237,232,0.42);--muted2:rgba(240,237,232,0.18);--border:rgba(240,237,232,0.09);--border2:rgba(240,237,232,0.15)}
        html{scroll-behavior:smooth}
        body{background:var(--bg)!important;color:var(--fg)!important;font-family:'Inter',sans-serif!important;overflow-x:hidden}
        header,.header,nav:not(.pnav){display:none!important}
        .noise{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.028}
        .smoke-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .blob{position:absolute;border-radius:50%;filter:blur(100px);animation:blobFloat 20s ease-in-out infinite}
        .blob1{width:600px;height:600px;background:radial-gradient(circle,rgba(60,60,60,0.5) 0%,transparent 70%);top:-150px;left:20%;opacity:0.22}
        .blob2{width:500px;height:500px;background:radial-gradient(circle,rgba(45,45,45,0.5) 0%,transparent 70%);top:10%;right:10%;opacity:0.18;animation-delay:-8s}
        .blob3{width:400px;height:400px;background:radial-gradient(circle,rgba(55,55,55,0.4) 0%,transparent 70%);bottom:5%;left:30%;opacity:0.15;animation-delay:-14s}
        @keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(40px,-30px) scale(1.05)}50%{transform:translate(-20px,50px) scale(0.95)}75%{transform:translate(30px,20px) scale(1.03)}}

        .pnav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:20px 52px;background:rgba(9,9,9,0.8);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
        .pnav-logo{display:flex;align-items:center;gap:10px;font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:var(--fg);text-decoration:none;letter-spacing:-0.02em}
        .pnav-links{display:flex;align-items:center;gap:36px;list-style:none}
        .pnav-links a{font-size:13px;font-weight:400;color:var(--muted);text-decoration:none;letter-spacing:0.01em;transition:color 0.2s}
        .pnav-links a:hover{color:var(--fg)}
        .btn-nav{background:var(--fg)!important;color:var(--bg)!important;padding:9px 20px;border-radius:100px;font-size:13px;font-weight:600;font-family:'Sora',sans-serif;text-decoration:none}
        .mobile-menu-btn{display:none;background:none;border:1px solid var(--border2);border-radius:8px;padding:8px 12px;color:var(--fg);font-size:18px;cursor:pointer;line-height:1}
        .mobile-menu{display:none;position:fixed;top:65px;left:0;right:0;z-index:199;background:rgba(9,9,9,0.97);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);padding:20px 24px;flex-direction:column;gap:4px}
        .mobile-menu.open{display:flex}
        .mobile-menu a{font-size:15px;color:var(--muted);text-decoration:none;padding:12px 0;border-bottom:1px solid var(--border);transition:color 0.2s}
        .mobile-menu a:last-child{border-bottom:none;margin-top:8px}
        .mobile-menu a:hover{color:var(--fg)}

        .hero-wipe-wrap{position:relative;z-index:1;min-height:100vh;overflow:hidden}
        .hero-wipe-panel{position:absolute;inset:0;background:var(--bg);transform-origin:right center;transition:transform 1.1s cubic-bezier(0.77,0,0.18,1);transform:scaleX(1);z-index:3}
        .hero-wipe-panel.open{transform:scaleX(0)}
        .hero{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 60px}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border2);border-radius:100px;padding:7px 16px;font-size:13px;color:var(--muted);margin-bottom:40px;backdrop-filter:blur(10px);background:rgba(255,255,255,0.03);opacity:0;transition:opacity 0.6s ease 1.2s}
        .hero-badge.show{opacity:1}
        .badge-dot{width:7px;height:7px;border-radius:50%;background:var(--fg);animation:pulse 2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
        .hero-h1{font-family:'Sora',sans-serif;font-size:clamp(56px,9vw,120px);font-weight:700;line-height:0.93;letter-spacing:-0.045em;margin-bottom:28px;color:var(--fg);opacity:0;transform:translateY(20px);transition:opacity 0.7s ease 1.3s,transform 0.7s ease 1.3s}
        .hero-h1.show{opacity:1;transform:translateY(0)}
        .hero-h1 .dim{color:var(--muted2)}
        .hero-sub{font-size:16px;color:var(--muted);max-width:460px;line-height:1.7;margin-bottom:44px;opacity:0;transition:opacity 0.6s ease 1.5s}
        .hero-sub.show{opacity:1}
        .hero-btns{display:flex;gap:12px;opacity:0;transition:opacity 0.6s ease 1.6s}
        .hero-btns.show{opacity:1}
        .btn-solid{background:var(--fg)!important;color:var(--bg)!important;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:600;font-family:'Sora',sans-serif;text-decoration:none;letter-spacing:-0.01em;transition:transform 0.2s;border:none}
        .btn-solid:hover{transform:scale(1.03)}
        .btn-outline{background:transparent!important;color:var(--fg)!important;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;font-family:'Sora',sans-serif;text-decoration:none;letter-spacing:-0.01em;border:1px solid var(--border2)!important;transition:transform 0.2s,border-color 0.2s}
        .btn-outline:hover{transform:scale(1.03);border-color:rgba(240,237,232,0.35)!important}
        .scroll-hint{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:20px;font-size:12px;color:var(--muted2);letter-spacing:0.05em;opacity:0;transition:opacity 0.6s ease 1.8s}
        .scroll-hint.show{opacity:1}
        .scroll-line{width:70px;height:1px;background:var(--border)}
        .mouse{width:20px;height:30px;border:1.5px solid rgba(240,237,232,0.2);border-radius:10px;position:relative;flex-shrink:0}
        .mouse::after{content:'';position:absolute;width:2px;height:5px;background:var(--muted);border-radius:2px;left:50%;top:5px;transform:translateX(-50%);animation:scrollAnim 1.6s ease-in-out infinite}
        @keyframes scrollAnim{0%,100%{transform:translateX(-50%) translateY(0);opacity:1}80%{transform:translateX(-50%) translateY(8px);opacity:0}}

        .ticker-wrap{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;background:rgba(255,255,255,0.015);padding:14px 0}
        .ticker-row{display:flex;overflow:hidden}
        .ticker-inner{display:flex;animation:tickRoll 28s linear infinite;width:max-content}
        .t-item{display:flex;align-items:center;gap:28px;padding:0 32px;font-size:13px;color:rgba(240,237,232,0.55);white-space:nowrap;letter-spacing:0.03em}
        @keyframes tickRoll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        .section{position:relative;z-index:1;max-width:1160px;margin:0 auto;padding:100px 52px}
        .divider{position:relative;z-index:1;border-top:1px solid var(--border)}
        .sec-tag{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border2);border-radius:100px;padding:6px 14px;font-size:12px;color:var(--muted);margin-bottom:32px;background:rgba(255,255,255,0.025)}
        .sec-dot{width:6px;height:6px;border-radius:50%;background:var(--fg)}

        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
        .about-h2{font-family:'Sora',sans-serif;font-size:clamp(48px,5vw,72px);font-weight:700;letter-spacing:-0.04em;line-height:1.0;margin-bottom:24px;color:var(--fg)}
        .about-h2 .dim{color:var(--muted2)}
        .about-para{font-size:15px;color:var(--muted);line-height:1.8;margin-bottom:20px}
        .chips{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}
        .chip{border:1px solid var(--border2);border-radius:100px;padding:7px 15px;font-size:12px;color:var(--muted);transition:color 0.2s,border-color 0.2s;cursor:default}
        .chip:hover{color:var(--fg);border-color:rgba(240,237,232,0.3)}
        .exp-table{width:100%;margin-top:32px;border-top:1px solid var(--border)}
        .exp-row{display:grid;grid-template-columns:1fr 1fr auto;padding:16px 0;border-bottom:1px solid var(--border);font-size:13px}
        .exp-role{color:var(--fg)}
        .exp-org{color:var(--muted)}
        .exp-date{color:var(--muted2);font-size:12px}
        .about-photo{width:100%;aspect-ratio:3/4;background:var(--bg3);border-radius:12px;border:1px solid var(--border);overflow:hidden;position:relative;transition:box-shadow 0.4s ease;box-shadow:0 0 0px rgba(240,237,232,0)}
        .about-photo:hover{box-shadow:0 0 40px rgba(240,237,232,0.18),0 0 80px rgba(240,237,232,0.10),inset 0 0 0 1px rgba(240,237,232,0.35)}
        .about-photo img{width:100%;height:100%;object-fit:cover;object-position:top center}
        .photo-overlay{position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(transparent,rgba(9,9,9,0.88))}
        .photo-name{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.03em}
        .photo-role{font-size:13px;color:var(--muted);margin-top:4px}

        .works-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}
        .works-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.02em;display:flex;align-items:center;gap:12px;color:var(--fg)}
        .works-arrow{width:32px;height:32px;border:1px solid var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--muted)}
        .proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px}
        .proj-card{position:relative;overflow:hidden;background:var(--bg3);cursor:pointer;text-decoration:none;display:block;aspect-ratio:4/3}
        .proj-card:first-child{border-radius:12px 0 0 0}
        .proj-card:nth-child(2){border-radius:0 12px 0 0}
        .proj-bg{width:100%;height:100%;background:var(--bg2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        .proj-overlay{position:absolute;inset:0;background:rgba(9,9,9,0.75);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease}
        .proj-card:hover .proj-overlay{opacity:1}
        .proj-cta-btn{display:inline-flex;align-items:center;gap:8px;background:rgba(240,237,232,0.15);backdrop-filter:blur(10px);border:1px solid rgba(240,237,232,0.3);color:var(--fg);padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none}
        .proj-info{position:absolute;bottom:0;left:0;right:0;padding:20px 24px;background:linear-gradient(transparent,rgba(9,9,9,0.92))}
        .proj-name{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;letter-spacing:-0.02em;margin-bottom:4px;color:var(--fg)}
        .proj-sub{font-size:12px;color:var(--muted)}

        .cap-split{display:grid;grid-template-columns:1fr 1fr;gap:0}
        .cap-left{padding-right:60px;border-right:1px solid var(--border);display:flex;flex-direction:column;justify-content:space-between}
        .cap-right{padding-left:60px}
        .cap-h2{font-family:'Sora',sans-serif;font-size:clamp(40px,5vw,60px);font-weight:700;letter-spacing:-0.04em;line-height:1.0;margin-bottom:20px;color:var(--fg)}
        .cap-desc{font-size:15px;color:var(--muted);line-height:1.75;margin-bottom:32px}
        .cap-btns{display:flex;gap:10px;flex-wrap:wrap}
        .cap-cards{display:flex;flex-direction:column;gap:2px}
        .cap-card{background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:22px 24px;display:flex;gap:18px;align-items:flex-start;transition:border-color 0.25s,background 0.25s}
        .cap-card:hover{border-color:var(--border2);background:rgba(255,255,255,0.03)}
        .cap-icon{font-size:18px;width:36px;height:36px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .cap-card-title{font-size:14px;font-weight:600;margin-bottom:5px;letter-spacing:-0.01em;color:var(--fg)}
        .cap-card-body{font-size:13px;color:var(--muted);line-height:1.6}
        .stats-row{background:var(--bg3);border:1px solid var(--border);border-radius:16px;display:grid;grid-template-columns:repeat(3,1fr);overflow:hidden;margin-top:48px}
        .stat-cell{padding:36px 28px;text-align:center;border-right:1px solid var(--border)}
        .stat-cell:last-child{border-right:none}
        .stat-n{font-family:'Sora',sans-serif;font-size:40px;font-weight:700;letter-spacing:-0.05em;line-height:1;margin-bottom:8px;color:var(--fg)}
        .stat-l{font-size:13px;color:var(--muted)}

        .skill-ticker{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;background:rgba(255,255,255,0.01);padding:12px 0}
        .st-row{display:flex;overflow:hidden;margin:5px 0}
        .st-inner{display:flex;animation:tickRoll 22s linear infinite;width:max-content}
        .st-inner.rev{animation-direction:reverse}
        .st-item{display:inline-flex;align-items:center;gap:8px;margin:0 6px;border:1px solid var(--border2);border-radius:100px;padding:7px 16px;font-size:12px;color:rgba(240,237,232,0.5);white-space:nowrap;background:rgba(255,255,255,0.03)}

        .process-split{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
        .process-sticky{position:sticky;top:100px}
        .terminal{width:100%;background:#0d0d0d;border-radius:12px;border:1px solid var(--border);padding:20px;font-family:monospace;font-size:11px;line-height:1.7;min-height:280px}
        .term-hdr{display:flex;gap:6px;margin-bottom:16px}
        .td{width:10px;height:10px;border-radius:50%}
        .td-r{background:#ff5f57}.td-y{background:#ffbd2e}.td-g{background:#28ca41}
        .tl{color:rgba(240,237,232,0.22)}
        .tl .p{color:rgba(240,237,232,0.4)}
        .tl .c{color:rgba(240,237,232,0.6)}
        .tl .o{color:rgba(240,237,232,0.15)}
        .tl .ok{color:#28ca41;opacity:0.7}

        .steps{display:flex;flex-direction:column}
        .step-item{padding:24px 0;border-bottom:1px solid var(--border);transition:all 0.3s ease}
        .step-item:first-child{border-top:1px solid var(--border)}
        .step-top{display:flex;align-items:center;gap:14px}
        .step-num-tag{font-size:11px;font-weight:700;color:var(--muted2);border:1px solid var(--border2);border-radius:100px;padding:3px 10px;letter-spacing:0.06em;transition:all 0.3s;flex-shrink:0}
        .step-icon-wrap{font-size:16px;width:32px;height:32px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .step-title-text{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.02em;color:var(--muted);opacity:0.45;transition:all 0.3s ease;flex:1}
        .step-arrow{color:var(--muted2);font-size:20px;transition:transform 0.3s ease;flex-shrink:0;line-height:1}
        .step-item:hover .step-title-text,.step-item.expanded .step-title-text{color:var(--fg);opacity:1}
        .step-item:hover .step-num-tag,.step-item.expanded .step-num-tag{color:var(--fg);border-color:rgba(240,237,232,0.4)}
        .step-item.expanded .step-arrow{transform:rotate(90deg)}
        .step-body{max-height:0;overflow:hidden;transition:max-height 0.4s ease,opacity 0.3s ease,padding 0.3s ease;opacity:0;font-size:14px;color:var(--muted);line-height:1.7;padding-left:56px}
        .step-item.expanded .step-body{max-height:120px;opacity:1;padding-top:12px}

        .faq-split{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
        .faq-h{font-family:'Sora',sans-serif;font-size:clamp(52px,6vw,80px);font-weight:700;letter-spacing:-0.05em;line-height:0.95;margin-bottom:16px;color:var(--fg)}
        .faq-sub{font-size:15px;color:var(--muted);line-height:1.7}
        .faq-list{display:flex;flex-direction:column;gap:2px}
        .faq-item{border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--bg3)}
        .faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 20px;font-size:14px;font-weight:500;color:var(--fg);background:none;border:none;cursor:pointer;text-align:left;gap:16px;transition:background 0.2s;font-family:'Inter',sans-serif}
        .faq-q:hover{background:rgba(255,255,255,0.02)}
        .faq-icon{width:22px;height:22px;flex-shrink:0;border:1px solid var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--muted);transition:transform 0.3s}
        .faq-icon.open{transform:rotate(45deg)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height 0.35s ease,padding 0.35s ease;font-size:13px;color:var(--muted);line-height:1.7;padding:0 20px}
        .faq-a.open{max-height:200px;padding:0 20px 18px}

        .cta-section{position:relative;z-index:1;border-top:1px solid var(--border);min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;overflow:hidden}
        .cta-blob1{position:absolute;width:500px;height:400px;border-radius:50%;filter:blur(80px);pointer-events:none;background:radial-gradient(circle,rgba(55,55,55,0.45) 0%,transparent 70%);top:-100px;left:50%;transform:translateX(-50%);animation:blobFloat 16s ease-in-out infinite}
        .cta-blob2{position:absolute;width:300px;height:300px;border-radius:50%;filter:blur(80px);pointer-events:none;background:radial-gradient(circle,rgba(40,40,40,0.4) 0%,transparent 70%);bottom:-60px;right:15%;animation:blobFloat 20s ease-in-out infinite reverse}
        .cta-avail{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border2);border-radius:100px;padding:7px 16px;font-size:13px;color:var(--muted);margin-bottom:32px;backdrop-filter:blur(10px);background:rgba(255,255,255,0.03)}
        .cta-avail-dot{width:7px;height:7px;border-radius:50%;background:var(--fg);animation:pulse 2s ease-in-out infinite}
        .cta-h{font-family:'Sora',sans-serif;font-size:clamp(32px,5vw,64px);font-weight:700;letter-spacing:-0.04em;line-height:1.05;margin-bottom:40px;max-width:680px;color:var(--fg)}
        .cta-links{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
        .cta-link{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:14px;text-decoration:none;padding:12px 22px;border:1px solid var(--border2);border-radius:100px;backdrop-filter:blur(10px);background:rgba(255,255,255,0.03);transition:color 0.2s,border-color 0.2s}
        .cta-link:hover{color:var(--fg);border-color:rgba(240,237,232,0.3)}
        .pfooter{position:relative;z-index:1;border-top:1px solid var(--border);padding:20px 52px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--muted2)}

        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}

        /* ===================== MOBILE ===================== */
        @media (max-width: 768px) {
          .pnav{padding:16px 20px}
          .pnav-links{display:none}
          .mobile-menu-btn{display:block}
          .hero{padding:100px 20px 60px}
          .hero-h1{font-size:clamp(48px,13vw,72px);letter-spacing:-0.035em}
          .hero-sub{font-size:14px;max-width:320px}
          .hero-btns{flex-direction:column;align-items:center;gap:10px;width:100%}
          .btn-solid,.btn-outline{width:100%;text-align:center;justify-content:center;padding:14px 20px}
          .scroll-hint{display:none}
          .section{padding:60px 20px}
          .about-grid{grid-template-columns:1fr;gap:40px}
          .about-h2{font-size:clamp(36px,10vw,52px)}
          .exp-row{grid-template-columns:1fr;gap:2px}
          .exp-date{font-size:11px}
          .proj-grid{grid-template-columns:1fr;gap:4px}
          .proj-card:first-child{border-radius:12px 12px 0 0}
          .proj-card:nth-child(2){border-radius:0 0 12px 12px}
          .proj-card{aspect-ratio:16/9}
          .cap-split{grid-template-columns:1fr}
          .cap-left{padding-right:0;border-right:none;border-bottom:1px solid var(--border);padding-bottom:40px;margin-bottom:40px}
          .cap-right{padding-left:0}
          .cap-h2{font-size:clamp(32px,8vw,48px)}
          .stats-row{margin-top:32px}
          .stat-cell{padding:20px 12px}
          .stat-n{font-size:28px}
          .stat-l{font-size:11px}
          .process-split{grid-template-columns:1fr;gap:40px}
          .process-sticky{position:relative;top:auto}
          .terminal{min-height:200px;font-size:10px}
          .step-title-text{font-size:15px}
          .faq-split{grid-template-columns:1fr;gap:32px}
          .faq-h{font-size:clamp(40px,10vw,60px)}
          .cta-section{padding:60px 20px;min-height:400px}
          .cta-links{flex-direction:column;align-items:center}
          .cta-link{width:100%;justify-content:center}
          .pfooter{padding:16px 20px;flex-direction:column;gap:8px;text-align:center}
          .pfooter span:nth-child(2){display:none}
        }

        @media (max-width: 480px) {
          .hero-h1{font-size:clamp(40px,14vw,60px)}
          .stats-row{grid-template-columns:1fr}
          .stat-cell{border-right:none;border-bottom:1px solid var(--border);padding:18px 16px}
          .stat-cell:last-child{border-bottom:none}
          .cap-btns{flex-direction:column}
          .cap-btns .btn-solid,.cap-btns .btn-outline{width:100%;text-align:center;justify-content:center}
        }
      `}</style>

      <div className="noise" />
      <div className="smoke-bg">
        <div className="blob blob1" /><div className="blob blob2" /><div className="blob blob3" />
      </div>

      <ScrollProgress />

      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <a href="#about" onClick={()=>setMobileMenuOpen(false)}>About</a>
        <a href="#projects" onClick={()=>setMobileMenuOpen(false)}>Projects</a>
        <a href="#capabilities" onClick={()=>setMobileMenuOpen(false)}>Capabilities</a>
        <a href="#contact" onClick={()=>setMobileMenuOpen(false)}>Contact</a>
        <a href="/static/resume.pdf" target="_blank" className="btn-nav" style={{textAlign:'center',marginTop:4}} onClick={()=>setMobileMenuOpen(false)}>Resume ↗</a>
      </div>

      <nav className="pnav">
        <a href="#" className="pnav-logo">Prasanth Panneer Selvam</a>
        <ul className="pnav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/static/resume.pdf" target="_blank" className="btn-nav">Resume ↗</a></li>
        </ul>
        <button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(o=>!o)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
<PlayIntroBtn />

      <div className="hero-wipe-wrap">
        <div className={`hero-wipe-panel${heroReady ? ' open' : ''}`} />
        <section className="hero">
          <div className={`hero-badge${heroReady ? ' show' : ''}`}>
  <span className="badge-dot" />Open to Azure Cloud Roles · Bengaluru
</div>
          <h1 className={`hero-h1${heroReady ? ' show' : ''}`}>
            Cloud that<br /><span className="dim">you need</span><br /><CyclingWord words={['secured.','monitored.','governed.','automated.']} />
          </h1>
          <p className={`hero-sub${heroReady ? ' show' : ''}`}>
            Building secure Azure environments with IaC, CI/CD pipelines, and cloud security. Microsoft AZ-900 Certified.
          </p>
          <div className={`hero-btns${heroReady ? ' show' : ''}`}>
            <a href="#projects" className="btn-solid">See Projects</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
          </div>
          <div className={`scroll-hint${heroReady ? ' show' : ''}`}>
            <span className="scroll-line" /><div className="mouse" /><span>Scroll down</span><span className="scroll-line" /><span>to see projects</span>
          </div>
        </section>
      </div>

      <div className="ticker-wrap">
        <div className="ticker-row">
          <div className="ticker-inner">
            {[...ticker1,...ticker1].map((t,i)=><div key={i} className="t-item">{t} <span style={{fontSize:8,opacity:0.4}}>●</span></div>)}
          </div>
        </div>
      </div>

      <div className="divider" />
      <section className="section reveal" id="about">
        <div className="about-grid">
          <div>
            <div className="sec-tag"><span className="sec-dot" /> About me</div>
            <h2 className="about-h2">Meet<br /><span className="dim">Prasanth.</span></h2>
            <p className="about-para">I'm a fresher Azure Cloud Engineer based in Bengaluru, specializing in cloud security, monitoring, and governance. I hold a Post Graduate Diploma in Cloud Data Management from Conestoga College, Canada.</p>
            <p className="about-para">I've built two enterprise Azure projects — CloudGuard (6-phase secure cloud infrastructure covering VNet, NSG, RBAC, KQL monitoring, Azure Policy, and Defender for Cloud) and CloudGuard IaC Pipeline (Terraform + GitHub Actions CI/CD automating full Azure infrastructure deployment).</p>
            <div className="chips">
              {['Azure Administration','Cloud Security','Log Analytics','KQL','RBAC & IAM','Azure Policy','NSG','Defender for Cloud','Azure Monitor','GRC'].map(c=><span key={c} className="chip">{c}</span>)}
            </div>
            <div className="exp-table">
              <div className="exp-row"><span className="exp-role">Azure Cloud Engineer</span><span className="exp-org">CloudGuard Project</span><span className="exp-date">Jan 2026 – Mar 2026</span></div>
              <div className="exp-row"><span className="exp-role">CloudGuard IaC Pipeline</span><span className="exp-org">Terraform + GitHub Actions</span><span className="exp-date">Apr 2026 - Apr 2026</span></div>
              <div className="exp-row"><span className="exp-role">PG Diploma – Cloud Data Mgmt</span><span className="exp-org">Conestoga College, Canada</span><span className="exp-date">2025</span></div>
              <div className="exp-row"><span className="exp-role">B.E. Computer Science</span><span className="exp-org">Kumaraguru College of Technology</span><span className="exp-date">2023</span></div>
            </div>
          </div>
          <div>
            <div className="about-photo">
              <img src="/avatar.jpg" alt="Prasanth Panneer Selvam" />
              <div className="photo-overlay">
                <div className="photo-name">Prasanth Panneer Selvam</div>
                <div className="photo-role">Azure Cloud Engineer · Bengaluru</div>
              </div>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
              <a href="https://linkedin.com/in/prasanthpanneer" target="_blank" className="btn-solid" style={{fontSize:13,padding:'10px 18px'}}>LinkedIn ↗</a>
              <a href="https://github.com/Prasanth0809" target="_blank" className="btn-outline" style={{fontSize:13,padding:'10px 18px'}}>GitHub ↗</a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="section reveal" id="projects">
        <div className="works-header">
          <div className="works-title">Recent Works <div className="works-arrow">↓</div></div>
          <a href="https://github.com/Prasanth0809" target="_blank" className="btn-outline" style={{fontSize:13,padding:'10px 20px'}}>All Projects ↗</a>
        </div>
        <div className="proj-grid">
          <a href="https://github.com/Prasanth0809/azure-secure-cloud-infrastructure" target="_blank" className="proj-card">
            <div className="proj-bg">
              <img src="/cloudguard-preview.png" style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',opacity:0.6}} alt="CloudGuard" />
            </div>
            <div className="proj-overlay"><span className="proj-cta-btn">View on GitHub ↗</span></div>
            <div className="proj-info">
              <div className="proj-name">CloudGuard</div>
              <div className="proj-sub">Azure Secure Cloud Infrastructure · 6 Phases</div>
            </div>
          </a>
          <a href="https://github.com/Prasanth0809/cloudguard-iac-pipeline" target="_blank" className="proj-card" style={{borderRadius:'0 12px 0 0'}}>
            <div className="proj-bg" style={{background:'#0d1117'}}>
              <div style={{position:'absolute',inset:0,padding:'24px',fontFamily:'monospace',fontSize:'11px',lineHeight:1.7,overflow:'hidden'}}>
                <div style={{color:'#28ca41',marginBottom:8}}>▶ terraform apply</div>
                <div style={{color:'rgba(240,237,232,0.4)'}}>azurerm_resource_group.rg: Creating...</div>
                <div style={{color:'rgba(240,237,232,0.4)'}}>azurerm_virtual_network.vnet: Creating...</div>
                <div style={{color:'rgba(240,237,232,0.4)'}}>azurerm_subnet.public: Creating...</div>
                <div style={{color:'rgba(240,237,232,0.4)'}}>azurerm_network_security_group.nsg: Creating...</div>
                <div style={{color:'#28ca41',marginTop:8}}>Apply complete! 5 resources added.</div>
                <div style={{color:'rgba(240,237,232,0.15)',marginTop:16,fontSize:10}}>✓ GitHub Actions CI/CD</div>
                <div style={{color:'rgba(240,237,232,0.15)',fontSize:10}}>✓ Terraform IaC</div>
                <div style={{color:'rgba(240,237,232,0.15)',fontSize:10}}>✓ Azure VNet + NSG</div>
              </div>
            </div>
            <div className="proj-overlay"><span className="proj-cta-btn">View on GitHub ↗</span></div>
            <div className="proj-info">
              <div className="proj-name">CloudGuard IaC Pipeline</div>
              <div className="proj-sub">Terraform + GitHub Actions CI/CD · Auto Deploy</div>
            </div>
          </a>
        </div>
      </section>

      <div className="divider" />
      <section className="section reveal" id="capabilities">
        <div className="cap-split">
          <div className="cap-left">
            <div>
              <div className="sec-tag"><span className="sec-dot" /> Capabilities</div>
              <h2 className="cap-h2">What I build &amp; protect</h2>
              <p className="cap-desc">Focused on enterprise-grade Azure environments — from secure network architecture to centralized monitoring, governance, and compliance.</p>
              <div className="cap-btns">
                <a href="#projects" className="btn-solid" style={{fontSize:13,padding:'11px 22px'}}>See Projects</a>
                <a href="#contact" className="btn-outline" style={{fontSize:13,padding:'11px 22px'}}>Get in Touch</a>
              </div>
            </div>
            <div className="stats-row">
              <div className="stat-cell"><div className="stat-n">2</div><div className="stat-l">Projects completed</div></div>
              <div className="stat-cell"><div className="stat-n">2</div><div className="stat-l">Cloud certifications</div></div>
              <div className="stat-cell"><div className="stat-n">AZ-900</div><div className="stat-l">Microsoft certified</div></div>
            </div>
          </div>
          <div className="cap-right">
            <div className="cap-cards">
              {[
                {icon:'🔒',title:'Cloud Security',body:'NSG hardening, Microsoft Defender for Cloud, Zero-Trust principles, threat detection and response.'},
                {icon:'📊',title:'Monitoring & KQL',body:'Log Analytics Workspace, custom KQL queries, Azure Monitor alerts and diagnostic settings.'},
                {icon:'🏛️',title:'Governance & Policy',body:'Azure Policy enforcement, compliance scoring, resource tagging, and RBAC role assignments.'},
                {icon:'🌐',title:'Networking',body:'VNet design, subnet segmentation, route tables, peering, and Azure Firewall configuration.'},
                {icon:'⚙️',title:'Infrastructure as Code',body:'Terraform provisioning, Azure resource automation, GitOps workflow, and repeatable infrastructure deployment.'},
                {icon:'🔄',title:'CI/CD Pipelines',body:'GitHub Actions automated pipelines, Terraform plan and apply workflows, push-triggered deployments.'},
              ].map(c=>(
                <div key={c.title} className="cap-card">
                  <div className="cap-icon">{c.icon}</div>
                  <div><div className="cap-card-title">{c.title}</div><div className="cap-card-body">{c.body}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="skill-ticker">
        <div className="st-row"><div className="st-inner">{[...ticker2,...ticker2].map((t,i)=><span key={i} className="st-item">{t}</span>)}</div></div>
        <div className="st-row"><div className="st-inner rev">{[...ticker3,...ticker3].map((t,i)=><span key={i} className="st-item">{t}</span>)}</div></div>
      </div>

      <div className="divider" />
      <section className="section reveal">
        <div className="process-split">
          <div className="process-sticky">
            <div className="terminal">
              <div className="term-hdr"><div className="td td-r"/><div className="td td-y"/><div className="td td-g"/></div>
              <TypingTerminal />
            </div>
          </div>
          <div>
            <div className="sec-tag"><span className="sec-dot" /> How I work</div>
            <h2 className="cap-h2" style={{marginBottom:8}}>Process</h2>
            <p className="cap-desc">Hover over each phase to explore. 8 structured phases across 2 projects building a complete enterprise Azure security environment.</p>
            <div style={{display:'flex',gap:10,marginBottom:32,flexWrap:'wrap'}}>
              <a href="https://github.com/Prasanth0809/azure-secure-cloud-infrastructure" target="_blank" className="btn-solid" style={{fontSize:13,padding:'11px 22px'}}>View CloudGuard</a>
              <a href="#projects" className="btn-outline" style={{fontSize:13,padding:'11px 22px'}}>See Projects</a>
            </div>
            <div className="steps">
              {steps.map((s, idx) => (
                <div
                  key={s.n}
                  className={`step-item${activeStep === idx ? ' expanded' : ''}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                >
                  <div className="step-top">
                    <span className="step-num-tag">0{s.n}</span>
                    <div className="step-icon-wrap">{s.icon}</div>
                    <div className="step-title-text">{s.title}</div>
                    <span className="step-arrow">›</span>
                  </div>
                  <div className="step-body">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />
      <JobHuntTimer />
      <div className="divider" />
      <section className="section reveal">
        <div className="faq-split">
          <div>
            <div className="sec-tag"><span className="sec-dot" /> FAQ</div>
            <div className="faq-h">Answers.</div>
            <p className="faq-sub">Common questions about my background, skills, and how to get in touch.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f,i)=>(
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={()=>toggleFaq(i)}>
                  {f.q}<div className={`faq-icon${openFaq===i?' open':''}`}>+</div>
                </button>
                <div className={`faq-a${openFaq===i?' open':''}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="cta-blob1" /><div className="cta-blob2" />
        <div className="cta-avail"><span className="cta-avail-dot" /> Available for Work</div>
        <h2 className="cta-h">Curious about what we can build together? Let's make it happen.</h2>
        <div className="cta-links">
          <a href="mailto:prasanthp.080902@gmail.com" className="cta-link">✉ prasanthp.080902@gmail.com</a>
          <a href="https://linkedin.com/in/prasanthpanneer" target="_blank" className="cta-link">in LinkedIn</a>
          <a href="https://github.com/Prasanth0809" target="_blank" className="cta-link">⌥ GitHub</a>
        </div>
      </section>

      <footer className="pfooter">
        <span>prasanthp.080902@gmail.com</span>
        <span style={{opacity:0.15}}>Design inspired by Portfolite</span>
        <span>© 2026 Prasanth Selvam. All rights reserved.</span>
      </footer>
    </>
  )
}