/* ============================================================
   CIVIC EDUCATION – INDIAN CONSTITUTION
   Complete JavaScript Module
   ============================================================ */

// ============================================================
// 1. PAGE LOADER
// ============================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
    setTimeout(() => loader.remove(), 1200);
  }
});

// ============================================================
// 2. THEME TOGGLE (persisted via localStorage)
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('constitution-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize theme
const savedTheme = localStorage.getItem('constitution-theme') || 'light';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ============================================================
// 3. NAVIGATION
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

// Hamburger toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown .dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      toggle.closest('.nav-dropdown').classList.toggle('open');
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ============================================================
// 4. PARALLAX SCROLLING
// ============================================================
const parallaxBg = document.getElementById('parallaxBg');
if (parallaxBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const layers = parallaxBg.querySelectorAll('.layer');
    layers.forEach((layer, i) => {
      const speed = (i + 1) * 0.15;
      layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ============================================================
// 5. SCROLL REVEAL ANIMATIONS
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger, .timeline-item').forEach(el => {
  revealObserver.observe(el);
});

// ============================================================
// 6. COUNTER ANIMATION (Stats)
// ============================================================
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.round(current);
    }, 16);

    counter.dataset.animated = 'true';
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-row').forEach(el => counterObserver.observe(el));

// ============================================================
// 7. ACCORDION (Articles Section)
// ============================================================
document.addEventListener('click', (e) => {
  const header = e.target.closest('.accordion-header');
  if (!header) return;

  const item = header.closest('.accordion-item');
  const wasActive = item.classList.contains('active');

  // Close all in same accordion
  const accordion = item.closest('.accordion');
  if (accordion) {
    accordion.querySelectorAll('.accordion-item.active').forEach(active => {
      active.classList.remove('active');
    });
  }

  if (!wasActive) {
    item.classList.add('active');
  }
});

// ============================================================
// 8. FILTER PILLS (Articles Part-wise filtering)
// ============================================================
document.addEventListener('click', (e) => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;

  const container = pill.closest('.section') || pill.closest('.container');
  if (!container) return;

  // Update active pill
  container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');

  const filter = pill.dataset.filter;
  const items = container.querySelectorAll('[data-part]');

  items.forEach(item => {
    if (filter === 'all' || item.dataset.part === filter) {
      item.style.display = '';
      item.style.animation = 'fadeInScale 0.3s ease';
    } else {
      item.style.display = 'none';
    }
  });
});

// ============================================================
// 9. SEARCH ENGINE
// ============================================================
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchTabs = document.querySelectorAll('.search-tab');

// Search data (comprehensive)
const searchData = [
  // Articles (representative selection - all 395)
  { type: 'Article', title: 'Article 1 – Name and territory of the Union', desc: 'India, that is Bharat, shall be a Union of States. The territory of India shall comprise the territories of the States, the Union territories, and any territory that may be acquired.', part: 'Part I' },
  { type: 'Article', title: 'Article 2 – Admission or establishment of new States', desc: 'Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit.', part: 'Part I' },
  { type: 'Article', title: 'Article 3 – Formation of new States and alteration of areas, boundaries or names of existing States', desc: 'Parliament may by law form a new State, increase or diminish the area or alter the boundaries or name of any State.', part: 'Part I' },
  { type: 'Article', title: 'Article 12 – Definition of State', desc: 'The State includes the Government and Parliament of India, Government and Legislature of each of the States, and all local or other authorities within the territory of India or under the control of the Government of India.', part: 'Part III' },
  { type: 'Article', title: 'Article 13 – Laws inconsistent with or in derogation of the fundamental rights', desc: 'All laws in force before the commencement of the Constitution, in so far as they are inconsistent with the provisions of Part III, shall be void.', part: 'Part III' },
  { type: 'Article', title: 'Article 14 – Equality before law', desc: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.', part: 'Part III' },
  { type: 'Article', title: 'Article 15 – Prohibition of discrimination', desc: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.', part: 'Part III' },
  { type: 'Article', title: 'Article 16 – Equality of opportunity in matters of public employment', desc: 'There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.', part: 'Part III' },
  { type: 'Article', title: 'Article 17 – Abolition of Untouchability', desc: 'Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of Untouchability shall be an offence punishable in accordance with law.', part: 'Part III' },
  { type: 'Article', title: 'Article 18 – Abolition of titles', desc: 'No title, not being a military or academic distinction, shall be conferred by the State. No citizen shall accept any title from any foreign State.', part: 'Part III' },
  { type: 'Article', title: 'Article 19 – Protection of certain rights regarding freedom of speech, etc.', desc: 'All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely throughout India, to reside and settle in any part of India, and to practise any profession.', part: 'Part III' },
  { type: 'Article', title: 'Article 20 – Protection in respect of conviction for offences', desc: 'No person shall be convicted of any offence except for violation of a law in force at the time of the act. No person shall be subjected to a penalty greater than that prescribed by law.', part: 'Part III' },
  { type: 'Article', title: 'Article 21 – Protection of life and personal liberty', desc: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.', part: 'Part III' },
  { type: 'Article', title: 'Article 21A – Right to education', desc: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may determine.', part: 'Part III' },
  { type: 'Article', title: 'Article 22 – Protection against arrest and detention in certain cases', desc: 'No person who is arrested shall be detained in custody without being informed of the grounds for such arrest. Every person arrested shall be produced before the nearest magistrate within 24 hours.', part: 'Part III' },
  { type: 'Article', title: 'Article 23 – Prohibition of traffic in human beings and forced labour', desc: 'Traffic in human beings and begar and other similar forms of forced labour are prohibited.', part: 'Part III' },
  { type: 'Article', title: 'Article 24 – Prohibition of employment of children in factories, etc.', desc: 'No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.', part: 'Part III' },
  { type: 'Article', title: 'Article 25 – Freedom of conscience and free profession, practice and propagation of religion', desc: 'All persons are equally entitled to freedom of conscience and the right to freely profess, practise and propagate religion.', part: 'Part III' },
  { type: 'Article', title: 'Article 26 – Freedom to manage religious affairs', desc: 'Every religious denomination shall have the right to establish and maintain institutions for religious and charitable purposes, and to manage its own affairs in matters of religion.', part: 'Part III' },
  { type: 'Article', title: 'Article 29 – Protection of interests of minorities', desc: 'Any section of the citizens having a distinct language, script or culture shall have the right to conserve the same.', part: 'Part III' },
  { type: 'Article', title: 'Article 30 – Right of minorities to establish and administer educational institutions', desc: 'All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice.', part: 'Part III' },
  { type: 'Article', title: 'Article 32 – Remedies for enforcement of Fundamental Rights', desc: 'The right to move the Supreme Court for the enforcement of Fundamental Rights is guaranteed. Dr. Ambedkar called it the "heart and soul" of the Constitution.', part: 'Part III' },
  { type: 'Article', title: 'Article 36 – Definition of State (Directive Principles)', desc: 'In this Part, "the State" has the same meaning as in Part III.', part: 'Part IV' },
  { type: 'Article', title: 'Article 39 – Certain principles of policy to be followed by the State', desc: 'The State shall direct its policy towards securing adequate means of livelihood, equal pay for equal work, and preventing concentration of wealth.', part: 'Part IV' },
  { type: 'Article', title: 'Article 40 – Organisation of village panchayats', desc: 'The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government.', part: 'Part IV' },
  { type: 'Article', title: 'Article 44 – Uniform civil code for the citizens', desc: 'The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.', part: 'Part IV' },
  { type: 'Article', title: 'Article 45 – Provision for early childhood care and education to children below the age of six years', desc: 'The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years.', part: 'Part IV' },
  { type: 'Article', title: 'Article 48 – Organisation of agriculture and animal husbandry', desc: 'The State shall organise agriculture and animal husbandry on modern and scientific lines. It shall prohibit the slaughter of cows and calves.', part: 'Part IV' },
  { type: 'Article', title: 'Article 48A – Protection and improvement of environment and safeguarding of forests and wild life', desc: 'The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.', part: 'Part IV' },
  { type: 'Article', title: 'Article 51A – Fundamental Duties', desc: 'It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals, the National Flag and the National Anthem.', part: 'Part IVA' },
  { type: 'Article', title: 'Article 52 – The President of India', desc: 'There shall be a President of India.', part: 'Part V' },
  { type: 'Article', title: 'Article 53 – Executive power of the Union', desc: 'The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him.', part: 'Part V' },
  { type: 'Article', title: 'Article 72 – Power of President to grant pardons, etc.', desc: 'The President shall have the power to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute the sentence of any person convicted of any offence.', part: 'Part V' },
  { type: 'Article', title: 'Article 74 – Council of Ministers to aid and advise President', desc: 'There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall act in accordance with such advice.', part: 'Part V' },
  { type: 'Article', title: 'Article 76 – Attorney-General for India', desc: 'The President shall appoint a person who is qualified to be appointed a Judge of the Supreme Court to be Attorney-General for India.', part: 'Part V' },
  { type: 'Article', title: 'Article 110 – Definition of Money Bills', desc: 'A Bill is deemed to be a Money Bill if it contains only provisions dealing with imposition/abolition/regulation of any tax, regulation of borrowing of money, or appropriation of money.', part: 'Part V' },
  { type: 'Article', title: 'Article 112 – Annual financial statement (Union Budget)', desc: 'The President shall cause to be laid before both the Houses of Parliament a statement of the estimated receipts and expenditure of the Government of India for the financial year.', part: 'Part V' },
  { type: 'Article', title: 'Article 123 – Power of President to promulgate Ordinances', desc: 'If at any time, except when both Houses of Parliament are in session, the President is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinance as the circumstances appear to require.', part: 'Part V' },
  { type: 'Article', title: 'Article 124 – Establishment and constitution of Supreme Court', desc: 'There shall be a Supreme Court of India consisting of a Chief Justice of India and such number of other Judges as Parliament may prescribe.', part: 'Part V' },
  { type: 'Article', title: 'Article 136 – Special leave to appeal by the Supreme Court', desc: 'The Supreme Court may, in its discretion, grant special leave to appeal from any judgment, decree, determination, sentence or order in any cause or matter passed or made by any court or tribunal in the territory of India.', part: 'Part V' },
  { type: 'Article', title: 'Article 143 – Power of President to consult Supreme Court', desc: 'If the President considers that a question of law or fact has arisen which is of such importance that it is expedient to obtain the opinion of the Supreme Court, he may refer the question to the Court for opinion.', part: 'Part V' },
  { type: 'Article', title: 'Article 148 – Comptroller and Auditor-General of India', desc: 'There shall be a Comptroller and Auditor-General of India who shall be appointed by the President and can only be removed in the manner and on like grounds as a Judge of the Supreme Court.', part: 'Part V' },
  { type: 'Article', title: 'Article 152 – Definition of State (State Government)', desc: 'In this Part, "State" does not include the State of Jammu and Kashmir (now reorganized).', part: 'Part VI' },
  { type: 'Article', title: 'Article 153 – Governors of States', desc: 'There shall be a Governor for each State.', part: 'Part VI' },
  { type: 'Article', title: 'Article 163 – Council of Ministers to aid and advise Governor', desc: 'There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor.', part: 'Part VI' },
  { type: 'Article', title: 'Article 214 – High Courts for States', desc: 'There shall be a High Court for each State.', part: 'Part VI' },
  { type: 'Article', title: 'Article 226 – Power of High Courts to issue certain writs', desc: 'Every High Court shall have power to issue writs, including writs of habeas corpus, mandamus, prohibition, quo warranto, and certiorari to any person or authority.', part: 'Part VI' },
  { type: 'Article', title: 'Article 243 – Definitions (Panchayats)', desc: 'Definitions of district, Gram Sabha, intermediate level, Panchayat, Panchayat area, population, and village for the purposes of Panchayati Raj.', part: 'Part IX' },
  { type: 'Article', title: 'Article 245 – Extent of laws made by Parliament and by the Legislatures of States', desc: 'Parliament may make laws for the whole or any part of the territory of India. A State Legislature may make laws for the whole or any part of the State.', part: 'Part XI' },
  { type: 'Article', title: 'Article 246 – Subject-matter of laws made by Parliament and by the Legislatures of States', desc: 'Parliament has exclusive power to make laws with respect to the Union List, State Legislatures for the State List, and concurrent power for the Concurrent List.', part: 'Part XI' },
  { type: 'Article', title: 'Article 280 – Finance Commission', desc: 'The President shall constitute a Finance Commission which shall make recommendations on the distribution of net proceeds of taxes between the Union and States.', part: 'Part XII' },
  { type: 'Article', title: 'Article 300A – Right to property', desc: 'No person shall be deprived of his property save by authority of law.', part: 'Part XII' },
  { type: 'Article', title: 'Article 311 – Dismissal, removal or reduction in rank of civil servants', desc: 'No person who is a member of a civil service of the Union or State or holds a civil post under the Union or State shall be dismissed or removed by an authority subordinate to that by which he was appointed.', part: 'Part XIV' },
  { type: 'Article', title: 'Article 312 – All-India Services', desc: 'The Rajya Sabha may create one or more All-India Services common to the Union and the States if it is in the national interest.', part: 'Part XIV' },
  { type: 'Article', title: 'Article 324 – Superintendence, direction and control of elections', desc: 'The superintendence, direction and control of the preparation of the electoral rolls for all elections to Parliament and State Legislatures shall be vested in the Election Commission.', part: 'Part XV' },
  { type: 'Article', title: 'Article 326 – Elections to the House of the People and Legislative Assemblies on the basis of adult suffrage', desc: 'The elections shall be on the basis of adult suffrage, i.e., every person who is a citizen of India and who is not less than eighteen years of age shall be entitled to be registered as a voter.', part: 'Part XV' },
  { type: 'Article', title: 'Article 330 – Reservation of seats for SCs and STs in the House of the People', desc: 'Seats shall be reserved in the House of the People for Scheduled Castes and Scheduled Tribes.', part: 'Part XVI' },
  { type: 'Article', title: 'Article 343 – Official language of the Union', desc: 'The official language of the Union shall be Hindi in Devanagari script. English shall continue to be used for official purposes.', part: 'Part XVII' },
  { type: 'Article', title: 'Article 352 – Proclamation of Emergency', desc: 'If the President is satisfied that a grave emergency exists whereby the security of India is threatened by war, external aggression or armed rebellion, he may proclaim Emergency.', part: 'Part XVIII' },
  { type: 'Article', title: 'Article 356 – Provisions in case of failure of constitutional machinery in States (President\'s Rule)', desc: 'If the President is satisfied that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of the Constitution, he may assume to himself all powers.', part: 'Part XVIII' },
  { type: 'Article', title: 'Article 360 – Financial Emergency', desc: 'If the President is satisfied that a situation has arisen whereby the financial stability or credit of India or any part thereof is threatened, he may proclaim Financial Emergency.', part: 'Part XVIII' },
  { type: 'Article', title: 'Article 368 – Power of Parliament to amend the Constitution', desc: 'Parliament may, in exercise of its constituent power, amend by way of addition, variation or repeal any provision of this Constitution.', part: 'Part XX' },
  { type: 'Article', title: 'Article 370 – Temporary provisions with respect to the State of Jammu and Kashmir', desc: 'This article granted special autonomous status to Jammu and Kashmir. It was abrogated in 2019.', part: 'Part XXI' },
  { type: 'Article', title: 'Article 395 – Repeals', desc: 'The Indian Independence Act, 1947, and the Government of India Act, 1935 are hereby repealed.', part: 'Part XXII' },

  // Parts
  { type: 'Part', title: 'Part I – The Union and its Territory', desc: 'Articles 1–4. Deals with the formation and name of India, admission and establishment of new States.', part: '' },
  { type: 'Part', title: 'Part II – Citizenship', desc: 'Articles 5–11. Defines citizenship at the commencement of the Constitution and laws relating to citizenship.', part: '' },
  { type: 'Part', title: 'Part III – Fundamental Rights', desc: 'Articles 12–35. Guarantees six Fundamental Rights to all citizens, enforceable by courts.', part: '' },
  { type: 'Part', title: 'Part IV – Directive Principles of State Policy', desc: 'Articles 36–51. Non-justiciable guidelines for the State to frame laws and policies.', part: '' },
  { type: 'Part', title: 'Part IVA – Fundamental Duties', desc: 'Article 51A. Lists eleven Fundamental Duties of every citizen. Added by the 42nd Amendment.', part: '' },
  { type: 'Part', title: 'Part V – The Union', desc: 'Articles 52–151. Deals with the President, Vice-President, Council of Ministers, Parliament, Supreme Court, and CAG.', part: '' },
  { type: 'Part', title: 'Part VI – The States', desc: 'Articles 152–237. Deals with the Governor, Council of Ministers, State Legislature, High Courts, and District Courts.', part: '' },

  // Schedules
  { type: 'Schedule', title: 'First Schedule', desc: 'Lists the States and Union Territories of India and their territories.', part: '' },
  { type: 'Schedule', title: 'Second Schedule', desc: 'Contains provisions relating to emoluments and privileges of the President, Governors, Speaker, Judges, and CAG.', part: '' },
  { type: 'Schedule', title: 'Third Schedule', desc: 'Contains forms of oaths or affirmations for members of Parliament, State Legislature, Ministers, Judges, and CAG.', part: '' },
  { type: 'Schedule', title: 'Fourth Schedule', desc: 'Contains provisions for the allocation of seats in the Rajya Sabha to the States and Union Territories.', part: '' },
  { type: 'Schedule', title: 'Fifth Schedule', desc: 'Contains provisions for the administration and control of Scheduled Areas and Scheduled Tribes.', part: '' },
  { type: 'Schedule', title: 'Sixth Schedule', desc: 'Contains provisions for the administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram.', part: '' },
  { type: 'Schedule', title: 'Seventh Schedule', desc: 'Contains the Union List, State List, and Concurrent List that divide legislative powers between Union and States.', part: '' },
  { type: 'Schedule', title: 'Eighth Schedule', desc: 'Lists the 22 official languages recognized by the Constitution of India.', part: '' },
  { type: 'Schedule', title: 'Ninth Schedule', desc: 'Contains acts and regulations related to land reforms that are immune from judicial review (added by 1st Amendment).', part: '' },
  { type: 'Schedule', title: 'Tenth Schedule', desc: 'Contains provisions relating to Anti-Defection Law (added by 52nd Amendment, 1985).', part: '' },
  { type: 'Schedule', title: 'Eleventh Schedule', desc: 'Contains 29 subjects on which Panchayats can legislate (added by 73rd Amendment).', part: '' },
  { type: 'Schedule', title: 'Twelfth Schedule', desc: 'Contains 18 subjects on which Municipalities can legislate (added by 74th Amendment).', part: '' },

  // Amendments
  { type: 'Amendment', title: '1st Amendment (1951)', desc: 'Added Ninth Schedule, restrictions on freedom of speech for public order, morality. Validated zamindari abolition laws.', part: '' },
  { type: 'Amendment', title: '7th Amendment (1956)', desc: 'Reorganization of States on linguistic basis. Abolished the classification of states into Parts A, B, C, and D.', part: '' },
  { type: 'Amendment', title: '24th Amendment (1971)', desc: 'Affirmed Parliament\'s power to amend Fundamental Rights. Response to Golaknath case.', part: '' },
  { type: 'Amendment', title: '25th Amendment (1971)', desc: 'Curtailed the right to property; introduced Article 31C to give primacy to Directive Principles (Articles 39b and 39c) over Fundamental Rights.', part: '' },
  { type: 'Amendment', title: '42nd Amendment (1976)', desc: 'Known as "Mini-Constitution." Added Fundamental Duties, words "Socialist, Secular" to the Preamble, curtailed judicial powers, extended tenure of Parliament.', part: '' },
  { type: 'Amendment', title: '44th Amendment (1978)', desc: 'Reversed many changes of the 42nd Amendment. Right to Property removed as a Fundamental Right. Restored powers of the judiciary.', part: '' },
  { type: 'Amendment', title: '52nd Amendment (1985)', desc: 'Added the Tenth Schedule (Anti-Defection Law) to curb political defections.', part: '' },
  { type: 'Amendment', title: '61st Amendment (1989)', desc: 'Reduced the voting age from 21 years to 18 years for elections to the Lok Sabha and State Assemblies.', part: '' },
  { type: 'Amendment', title: '73rd Amendment (1992)', desc: 'Gave constitutional status to Panchayati Raj institutions. Added Part IX and the Eleventh Schedule.', part: '' },
  { type: 'Amendment', title: '74th Amendment (1992)', desc: 'Gave constitutional status to Urban Local Bodies (Municipalities). Added Part IXA and the Twelfth Schedule.', part: '' },
  { type: 'Amendment', title: '86th Amendment (2002)', desc: 'Made free and compulsory education a Fundamental Right for children aged 6–14 (Article 21A). Added Article 51A(k) as a Fundamental Duty.', part: '' },
  { type: 'Amendment', title: '101st Amendment (2016)', desc: 'Introduced the Goods and Services Tax (GST). Added Articles 246A, 269A, 279A for the GST Council.', part: '' },
  { type: 'Amendment', title: '103rd Amendment (2019)', desc: 'Provided 10% reservation in education and employment for Economically Weaker Sections (EWS) of society.', part: '' },

  // Case Laws
  { type: 'Case Law', title: 'Kesavananda Bharati v. State of Kerala (1973)', desc: 'Established the Basic Structure Doctrine. Parliament cannot amend the Constitution to destroy its basic features.', part: '' },
  { type: 'Case Law', title: 'Maneka Gandhi v. Union of India (1978)', desc: 'Expanded the scope of Article 21. Right to life includes the right to live with dignity.', part: '' },
  { type: 'Case Law', title: 'Minerva Mills v. Union of India (1980)', desc: 'Reaffirmed the Basic Structure Doctrine. Balance between Fundamental Rights and Directive Principles is a basic feature.', part: '' },
  { type: 'Case Law', title: 'Vishaka v. State of Rajasthan (1997)', desc: 'Laid down guidelines to prevent sexual harassment at the workplace, later codified in the POSH Act, 2013.', part: '' },
  { type: 'Case Law', title: 'S.R. Bommai v. Union of India (1994)', desc: 'Established guidelines for the use of Article 356 (President\'s Rule). Made it subject to judicial review.', part: '' },
  { type: 'Case Law', title: 'Golaknath v. State of Punjab (1967)', desc: 'Held that Parliament cannot amend Fundamental Rights. Later overruled by the 24th Amendment and Kesavananda Bharati case.', part: '' },
  { type: 'Case Law', title: 'A.K. Gopalan v. State of Madras (1950)', desc: 'First major case on preventive detention. Adopted a narrow interpretation of Article 21 (later overruled by Maneka Gandhi).', part: '' },
  { type: 'Case Law', title: 'Indra Sawhney v. Union of India (1992)', desc: 'Upheld 27% OBC reservation but capped total reservation at 50%. Introduced the "creamy layer" concept for OBCs.', part: '' },
  { type: 'Case Law', title: 'Navtej Singh Johar v. Union of India (2018)', desc: 'Decriminalized consensual homosexual acts by striking down Section 377 of the IPC as unconstitutional.', part: '' },
  { type: 'Case Law', title: 'K.S. Puttaswamy v. Union of India (2017)', desc: 'Declared Right to Privacy as a fundamental right under Article 21 of the Constitution.', part: '' },
];

let activeSearchTab = 'all';

if (searchInput) {
  searchInput.addEventListener('input', () => {
    performSearch(searchInput.value.trim());
  });
}

searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeSearchTab = tab.dataset.tab;
    if (searchInput && searchInput.value.trim()) {
      performSearch(searchInput.value.trim());
    }
  });
});

function performSearch(query) {
  if (!searchResults) return;

  if (!query) {
    searchResults.innerHTML = '<div class="no-results">Start typing to search across the Constitution...</div>';
    return;
  }

  const lower = query.toLowerCase();
  let results = searchData.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(lower) ||
                         item.desc.toLowerCase().includes(lower);
    const matchesTab = activeSearchTab === 'all' ||
                       item.type.toLowerCase().replace(' ', '') === activeSearchTab;
    return matchesQuery && matchesTab;
  });

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
    return;
  }

  searchResults.innerHTML = results.slice(0, 30).map(item => `
    <div class="search-result-item">
      <span class="result-type">${item.type}</span>
      <div class="result-title">${highlightMatch(item.title, query)}</div>
      <div class="result-desc">${highlightMatch(item.desc, query)}</div>
    </div>
  `).join('');
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<strong style="color:var(--saffron)">$1</strong>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================================
// 10. QUIZ ENGINE
// ============================================================
const quizQuestions = [
  {
    question: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Patel'],
    correct: 1
  },
  {
    question: 'When was the Indian Constitution adopted?',
    options: ['26 January 1950', '15 August 1947', '26 November 1949', '2 October 1948'],
    correct: 2
  },
  {
    question: 'How many Fundamental Rights are guaranteed by the Indian Constitution?',
    options: ['5', '6', '7', '8'],
    correct: 1
  },
  {
    question: 'Which Article of the Constitution abolishes Untouchability?',
    options: ['Article 14', 'Article 15', 'Article 17', 'Article 19'],
    correct: 2
  },
  {
    question: 'The concept of Fundamental Duties was borrowed from which country?',
    options: ['USA', 'UK', 'USSR', 'France'],
    correct: 2
  },
  {
    question: 'Who was the Chairman of the Drafting Committee of the Constitution?',
    options: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'B.N. Rau'],
    correct: 1
  },
  {
    question: 'Which Article gives the Right to Equality?',
    options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
    correct: 1
  },
  {
    question: 'The Indian Constitution originally had how many Articles?',
    options: ['350', '395', '400', '448'],
    correct: 1
  },
  {
    question: 'Which Schedule of the Constitution contains the Anti-Defection Law?',
    options: ['Eighth Schedule', 'Ninth Schedule', 'Tenth Schedule', 'Eleventh Schedule'],
    correct: 2
  },
  {
    question: 'Which amendment is known as the "Mini-Constitution"?',
    options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
    correct: 0
  },
  {
    question: 'The Preamble of the Indian Constitution declares India as a:',
    options: ['Federal Republic', 'Sovereign Socialist Secular Democratic Republic', 'Democratic Monarchy', 'Unitary Republic'],
    correct: 1
  },
  {
    question: 'Right to Education was added by which Constitutional Amendment?',
    options: ['73rd Amendment', '86th Amendment', '91st Amendment', '97th Amendment'],
    correct: 1
  },
  {
    question: 'Which case established the Basic Structure Doctrine?',
    options: ['Golaknath Case', 'Kesavananda Bharati Case', 'Minerva Mills Case', 'A.K. Gopalan Case'],
    correct: 1
  },
  {
    question: 'The Directive Principles of State Policy are contained in which Part?',
    options: ['Part III', 'Part IV', 'Part IVA', 'Part V'],
    correct: 1
  },
  {
    question: 'GST was introduced by which Amendment?',
    options: ['99th Amendment', '100th Amendment', '101st Amendment', '102nd Amendment'],
    correct: 2
  },
  {
    question: 'Article 32 is called the "Heart and Soul" of the Constitution. What right does it guarantee?',
    options: ['Right to Equality', 'Right to Freedom', 'Constitutional Remedies', 'Right to Education'],
    correct: 2
  },
  {
    question: 'How many Schedules are there in the Indian Constitution?',
    options: ['8', '10', '12', '14'],
    correct: 2
  },
  {
    question: 'The word "Secular" was added to the Preamble by which Amendment?',
    options: ['1st Amendment', '42nd Amendment', '44th Amendment', '52nd Amendment'],
    correct: 1
  },
  {
    question: 'Right to Privacy was declared a Fundamental Right in which case?',
    options: ['Navtej Singh Johar', 'K.S. Puttaswamy', 'Vishaka', 'S.R. Bommai'],
    correct: 1
  },
  {
    question: 'Which Article deals with the President\'s Rule in a State?',
    options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'],
    correct: 1
  },
];

let currentQuestion = 0;
let score = 0;
let quizActive = false;

const quizUI = {
  container: document.getElementById('quizContainer'),
  question: document.getElementById('quizQuestion'),
  options: document.getElementById('quizOptions'),
  progressFill: document.getElementById('quizProgressFill'),
  progressText: document.getElementById('quizProgressText'),
  nextBtn: document.getElementById('quizNext'),
  result: document.getElementById('quizResult'),
  card: document.getElementById('quizCard'),
  startBtn: document.getElementById('quizStart'),
  startScreen: document.getElementById('quizStartScreen'),
};

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  quizActive = true;

  if (quizUI.startScreen) quizUI.startScreen.style.display = 'none';
  if (quizUI.card) quizUI.card.style.display = 'block';
  if (quizUI.result) quizUI.result.style.display = 'none';

  showQuestion();
}

function showQuestion() {
  if (!quizUI.question || !quizUI.options) return;

  const q = quizQuestions[currentQuestion];
  const total = quizQuestions.length;

  quizUI.question.textContent = q.question;
  if (quizUI.progressFill) {
    quizUI.progressFill.style.width = `${((currentQuestion) / total) * 100}%`;
  }
  if (quizUI.progressText) {
    quizUI.progressText.textContent = `${currentQuestion + 1} / ${total}`;
  }

  quizUI.options.innerHTML = q.options.map((opt, i) => `
    <div class="quiz-option" data-index="${i}">
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span>${opt}</span>
    </div>
  `).join('');

  if (quizUI.nextBtn) quizUI.nextBtn.style.display = 'none';

  // Option click handler
  quizUI.options.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => selectAnswer(parseInt(opt.dataset.index)));
  });
}

function selectAnswer(index) {
  if (!quizActive) return;

  const q = quizQuestions[currentQuestion];
  const options = quizUI.options.querySelectorAll('.quiz-option');

  // Disable further clicks
  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });

  if (index === q.correct) {
    score++;
    options[index].classList.add('correct');
  } else {
    options[index].classList.add('wrong');
    options[q.correct].classList.add('correct');
  }

  if (quizUI.nextBtn) quizUI.nextBtn.style.display = 'inline-flex';
}

if (quizUI.nextBtn) {
  quizUI.nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
      showResult();
    } else {
      showQuestion();
    }
  });
}

if (quizUI.startBtn) {
  quizUI.startBtn.addEventListener('click', startQuiz);
}

function showResult() {
  quizActive = false;
  if (quizUI.card) quizUI.card.style.display = 'none';
  if (quizUI.result) {
    quizUI.result.style.display = 'block';
    const total = quizQuestions.length;
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct >= 80) msg = '🎉 Excellent! You know your Constitution well!';
    else if (pct >= 60) msg = '👍 Good job! Keep exploring to learn more.';
    else if (pct >= 40) msg = '📖 Not bad! Consider revising the key topics.';
    else msg = '📚 Keep learning! The Constitution has so much to offer.';

    quizUI.result.innerHTML = `
      <div class="quiz-result">
        <div class="result-score">${score}/${total}</div>
        <div class="result-text">${msg}</div>
        <p style="color:var(--text-muted); margin-bottom: 30px;">You scored ${pct}%</p>
        <button class="btn btn-primary" onclick="startQuiz()">Try Again 🔄</button>
      </div>
    `;
  }
}

// ============================================================
// 11. FLOATING PARTICLES
// ============================================================
function createFloatingParticles() {
  const colors = ['#FF9933', '#138808', '#6C63FF', '#00D2FF'];
  const body = document.body;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    const size = Math.random() * 6 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 6 + 4}s ease-in-out infinite ${Math.random() * 3}s;
    `;
    body.appendChild(particle);
  }
}

createFloatingParticles();

// ============================================================
// 12. CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');

    // Simple success feedback
    contactForm.innerHTML = `
      <div style="text-align:center; padding: 40px 0;">
        <div style="font-size: 3rem; margin-bottom: 16px;">✅</div>
        <h3 style="margin-bottom: 8px;">Thank you, ${name || 'Citizen'}!</h3>
        <p style="color: var(--text-secondary);">Your message has been received. We'll get back to you soon.</p>
      </div>
    `;
  });
}

// ============================================================
// 13. SMOOTH SCROLL FOR ANCHORS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// 14. ACTIVE NAV LINK HIGHLIGHT
// ============================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
