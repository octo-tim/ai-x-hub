// ============================================================
// AI-X Hub Mock Data
// ============================================================

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  jobTag: string;
  purposeTag: string;
  aiTool: string;
  author: string;
  copyCount: number;
}

export interface UseCase {
  id: string;
  title: string;
  jobTag: string;
  aiTool: string;
  beforeHours: number;
  afterHours: number;
  savedHours: number;
  resultSummary: string;
  author: string;
}

// ── Prompts ──────────────────────────────────────────────────
export const prompts: Prompt[] = [
  {
    id: "p1",
    title: "고객 미팅 사전 브리핑 자료 생성",
    description:
      "고객사 정보를 입력하면 미팅 전에 필요한 핵심 브리핑 자료를 자동으로 생성합니다.",
    content: `당신은 B2B 영업 전략 전문가입니다.\n\n아래 정보를 바탕으로 [고객사] 미팅에 필요한 사전 브리핑 자료를 작성해 주세요.\n\n- 고객사명: [고객사]\n- 담당 직무: [직무]\n- 미팅 목적: [주제]\n- 주요 논의 안건: [안건]\n\n출력 형식:\n1. 고객사 개요 (업종, 규모, 최근 동향)\n2. 이전 거래 이력 요약\n3. 미팅 시 예상 질문 및 대응 포인트\n4. 제안 가능한 솔루션 3가지`,
    jobTag: "영업",
    purposeTag: "미팅 준비",
    aiTool: "Claude",
    author: "김서윤 · 영업1팀",
    copyCount: 342,
  },
  {
    id: "p2",
    title: "주간 업무 보고서 초안 작성",
    description:
      "한 주간의 업무 내역을 정리해 깔끔한 보고서 초안을 생성합니다.",
    content: `당신은 기업 내부 보고서 작성 전문가입니다.\n\n아래 정보를 기반으로 [직무] 부서의 주간 업무 보고서를 작성해 주세요.\n\n- 부서/팀: [직무]\n- 보고 기간: [기간]\n- 금주 완료 업무: [완료업무]\n- 진행 중인 업무: [진행업무]\n- 이슈 및 리스크: [이슈]\n- 차주 계획: [차주계획]\n\n보고서는 경영진이 3분 이내에 읽을 수 있도록 간결하게 작성하되, 정량적 성과 지표를 반드시 포함해 주세요.`,
    jobTag: "기획",
    purposeTag: "보고서 작성",
    aiTool: "ChatGPT",
    author: "이준혁 · 전략기획팀",
    copyCount: 518,
  },
  {
    id: "p3",
    title: "기술 면접 질문 생성기",
    description:
      "채용 포지션에 맞는 기술 면접 질문과 평가 기준을 자동으로 생성합니다.",
    content: `당신은 테크 기업의 시니어 채용 담당자입니다.\n\n아래 조건에 맞는 [직무] 포지션 기술 면접 질문을 생성해 주세요.\n\n- 채용 포지션: [직무]\n- 경력 수준: [경력]\n- 핵심 기술 스택: [기술스택]\n- 평가하고 싶은 역량: [주제]\n\n각 질문에 대해:\n1. 질문 내용\n2. 출제 의도\n3. 우수 답변 예시 (A등급 기준)\n4. 미흡 답변 특징 (C등급 기준)\n을 포함해 주세요. 총 5개 질문을 생성합니다.`,
    jobTag: "HR",
    purposeTag: "채용",
    aiTool: "Claude",
    author: "박지민 · 인사팀",
    copyCount: 276,
  },
  {
    id: "p4",
    title: "마케팅 카피 A/B 테스트 시안 생성",
    description:
      "제품·캠페인 정보를 입력하면 A/B 테스트용 마케팅 카피 2세트를 생성합니다.",
    content: `당신은 퍼포먼스 마케팅 카피라이터입니다.\n\n아래 제품/캠페인 정보를 바탕으로 A/B 테스트에 사용할 광고 카피 2세트를 작성해 주세요.\n\n- 제품/서비스: [주제]\n- 타겟 고객: [고객사]\n- 캠페인 목적: [목적]\n- 톤앤매너: [톤]\n- 게재 채널: [채널]\n\n각 세트는 다음을 포함:\n- 헤드라인 (15자 이내)\n- 서브카피 (30자 이내)\n- CTA 버튼 문구\n- 해당 카피의 심리적 소구 포인트 설명`,
    jobTag: "마케팅",
    purposeTag: "콘텐츠 제작",
    aiTool: "ChatGPT",
    author: "최예린 · 마케팅팀",
    copyCount: 189,
  },
  {
    id: "p5",
    title: "코드 리뷰 체크리스트 자동 생성",
    description:
      "PR 내용을 붙여넣으면 코드 리뷰 시 확인해야 할 체크리스트를 생성합니다.",
    content: `당신은 10년 경력의 시니어 소프트웨어 엔지니어입니다.\n\n아래 Pull Request의 코드 변경사항을 분석하고, [직무] 관점에서 코드 리뷰 체크리스트를 작성해 주세요.\n\n- 프로젝트 유형: [주제]\n- 언어/프레임워크: [기술스택]\n- 변경 코드:\n\`\`\`\n[코드]\n\`\`\`\n\n체크리스트 항목:\n1. 보안 취약점 (SQL Injection, XSS 등)\n2. 성능 이슈 (N+1 쿼리, 메모리 누수 등)\n3. 코드 컨벤션 준수 여부\n4. 테스트 커버리지\n5. 에지 케이스 처리`,
    jobTag: "개발",
    purposeTag: "코드 품질",
    aiTool: "Claude",
    author: "정민수 · 개발2팀",
    copyCount: 421,
  },
  {
    id: "p6",
    title: "계약서 조항 리스크 분석",
    description:
      "계약서 초안의 주요 조항을 분석하고 리스크 포인트를 식별합니다.",
    content: `당신은 기업 법무 전문가입니다.\n\n아래 계약서 조항을 검토하고 [직무] 관점에서 리스크 분석을 수행해 주세요.\n\n- 계약 유형: [주제]\n- 상대방: [고객사]\n- 검토 대상 조항:\n[조항내용]\n\n각 조항에 대해:\n1. 리스크 수준 (상/중/하)\n2. 구체적 리스크 내용\n3. 수정 제안 문구\n4. 협상 시 참고사항\n을 작성해 주세요.`,
    jobTag: "법무",
    purposeTag: "계약 검토",
    aiTool: "Claude",
    author: "한소희 · 법무팀",
    copyCount: 157,
  },
];

// ── Use Cases ────────────────────────────────────────────────
export const useCases: UseCase[] = [
  {
    id: "uc1",
    title: "RFP 응답서 초안 작성 자동화",
    jobTag: "영업",
    aiTool: "Claude",
    beforeHours: 16,
    afterHours: 3,
    savedHours: 13,
    resultSummary:
      "기존에 2일 이상 소요되던 RFP 응답서 초안 작성을 3시간으로 단축. 과거 수주 이력과 레퍼런스를 기반으로 Claude가 초안을 생성하고, 담당자가 검토·수정하는 워크플로우를 정립함.",
    author: "김서윤 · 영업1팀",
  },
  {
    id: "uc2",
    title: "신규 입사자 온보딩 가이드 자동 생성",
    jobTag: "HR",
    aiTool: "ChatGPT",
    beforeHours: 8,
    afterHours: 1.5,
    savedHours: 6.5,
    resultSummary:
      "부서별 맞춤 온보딩 가이드를 ChatGPT로 자동 생성. 인사팀 업무 부담을 대폭 줄이고 신규 입사자 만족도를 15% 향상시킴.",
    author: "박지민 · 인사팀",
  },
  {
    id: "uc3",
    title: "경쟁사 동향 리서치 보고서 자동화",
    jobTag: "기획",
    aiTool: "Perplexity",
    beforeHours: 12,
    afterHours: 2,
    savedHours: 10,
    resultSummary:
      "Perplexity AI를 활용해 주간 경쟁사 동향 보고서를 자동 생성. 기존 수작업 리서치 대비 80% 이상 시간 절감. 뉴스, IR 자료, 특허 동향까지 포괄적으로 커버.",
    author: "이준혁 · 전략기획팀",
  },
  {
    id: "uc4",
    title: "QA 테스트 케이스 자동 생성",
    jobTag: "개발",
    aiTool: "Claude",
    beforeHours: 6,
    afterHours: 1,
    savedHours: 5,
    resultSummary:
      "기능 명세서를 Claude에 입력하면 엣지 케이스를 포함한 테스트 케이스를 자동 생성. QA 팀의 테스트 설계 시간을 83% 절감하고 테스트 커버리지를 40% 향상.",
    author: "정민수 · 개발2팀",
  },
  {
    id: "uc5",
    title: "고객 VOC 감성 분석 및 분류 자동화",
    jobTag: "CS",
    aiTool: "ChatGPT",
    beforeHours: 10,
    afterHours: 1.5,
    savedHours: 8.5,
    resultSummary:
      "월 2,000건 이상의 고객 VOC를 ChatGPT API로 자동 분류·감성 분석. 긴급 이슈 즉시 에스컬레이션 체계 구축, CS 대응 속도 60% 개선.",
    author: "오지은 · CS팀",
  },
  {
    id: "uc6",
    title: "재무 데이터 시각화 리포트 자동화",
    jobTag: "재무",
    aiTool: "Claude",
    beforeHours: 20,
    afterHours: 4,
    savedHours: 16,
    resultSummary:
      "월간 재무 데이터를 Claude Code로 분석·시각화하여 경영진 보고용 리포트를 자동 생성. 수작업 Excel 작업을 대폭 줄이고 분석 정확도 향상.",
    author: "송태호 · 재무팀",
  },
];

// ── Dashboard Stats ──────────────────────────────────────────
export const dashboardStats = {
  totalPrompts: prompts.length,
  totalUseCases: useCases.length,
  totalSavedHours: useCases.reduce((sum, uc) => sum + uc.savedHours, 0),
  totalUsers: 284,
  monthlySavedHours: [
    { month: "2024.10", hours: 120 },
    { month: "2024.11", hours: 185 },
    { month: "2024.12", hours: 240 },
    { month: "2025.01", hours: 310 },
    { month: "2025.02", hours: 390 },
    { month: "2025.03", hours: 475 },
  ],
  topJobTags: [
    { tag: "영업", count: 45 },
    { tag: "개발", count: 38 },
    { tag: "기획", count: 32 },
    { tag: "마케팅", count: 28 },
    { tag: "HR", count: 22 },
  ],
};

// ── Current User ─────────────────────────────────────────────
export const currentUser = {
  name: "윤경식",
  team: "DX추진팀",
  avatar: "",
  points: 1_250,
  role: "AI Champion",
};

// ── AI Workflow Templates (업무별 AI 활용 가이드) ─────────────
export interface WorkflowTemplate {
  id: string;
  job: string;
  icon: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  description: string;
  workflows: {
    task: string;
    tool: string;
    savedMin: number;
    difficulty: "초급" | "중급" | "고급";
  }[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "wt1",
    job: "영업",
    icon: "💼",
    color: "text-blue-700",
    borderColor: "border-blue-200",
    bgGradient: "from-blue-50 to-sky-50",
    description: "고객 응대부터 제안서까지, AI로 영업 사이클을 단축하세요.",
    workflows: [
      { task: "고객사 사전 리서치", tool: "Perplexity", savedMin: 45, difficulty: "초급" },
      { task: "제안서 초안 작성", tool: "Claude", savedMin: 120, difficulty: "중급" },
      { task: "미팅 후 회의록 정리", tool: "ChatGPT", savedMin: 30, difficulty: "초급" },
      { task: "RFP 응답서 작성", tool: "Claude", savedMin: 180, difficulty: "고급" },
    ],
  },
  {
    id: "wt2",
    job: "마케팅",
    icon: "📣",
    color: "text-rose-700",
    borderColor: "border-rose-200",
    bgGradient: "from-rose-50 to-pink-50",
    description: "콘텐츠 기획부터 성과 분석까지, 마케팅 전 과정을 AI로 가속하세요.",
    workflows: [
      { task: "광고 카피 A/B 시안", tool: "ChatGPT", savedMin: 60, difficulty: "초급" },
      { task: "블로그 포스트 초안", tool: "Claude", savedMin: 90, difficulty: "중급" },
      { task: "경쟁사 SNS 벤치마킹", tool: "Perplexity", savedMin: 40, difficulty: "초급" },
      { task: "캠페인 성과 리포트", tool: "Claude", savedMin: 75, difficulty: "중급" },
    ],
  },
  {
    id: "wt3",
    job: "개발",
    icon: "💻",
    color: "text-emerald-700",
    borderColor: "border-emerald-200",
    bgGradient: "from-emerald-50 to-teal-50",
    description: "코드 리뷰, 테스트, 문서화까지 개발 생산성을 극대화하세요.",
    workflows: [
      { task: "코드 리뷰 체크리스트", tool: "Claude", savedMin: 30, difficulty: "초급" },
      { task: "테스트 케이스 자동 생성", tool: "Claude", savedMin: 60, difficulty: "중급" },
      { task: "API 문서 작성", tool: "ChatGPT", savedMin: 45, difficulty: "중급" },
      { task: "버그 원인 분석", tool: "Claude", savedMin: 25, difficulty: "초급" },
    ],
  },
  {
    id: "wt4",
    job: "기획",
    icon: "📊",
    color: "text-amber-700",
    borderColor: "border-amber-200",
    bgGradient: "from-amber-50 to-yellow-50",
    description: "시장 조사, 보고서, 전략 수립을 AI로 체계적으로 수행하세요.",
    workflows: [
      { task: "경쟁사 동향 리서치", tool: "Perplexity", savedMin: 90, difficulty: "초급" },
      { task: "주간 업무 보고서", tool: "Claude", savedMin: 45, difficulty: "초급" },
      { task: "사업계획서 초안", tool: "Claude", savedMin: 150, difficulty: "고급" },
      { task: "데이터 인사이트 도출", tool: "ChatGPT", savedMin: 60, difficulty: "중급" },
    ],
  },
  {
    id: "wt5",
    job: "HR",
    icon: "🤝",
    color: "text-violet-700",
    borderColor: "border-violet-200",
    bgGradient: "from-violet-50 to-purple-50",
    description: "채용, 온보딩, 교육 등 인사 업무를 AI로 효율화하세요.",
    workflows: [
      { task: "면접 질문 생성", tool: "Claude", savedMin: 40, difficulty: "초급" },
      { task: "온보딩 가이드 제작", tool: "ChatGPT", savedMin: 60, difficulty: "중급" },
      { task: "JD 작성 및 최적화", tool: "Claude", savedMin: 30, difficulty: "초급" },
      { task: "교육 커리큘럼 설계", tool: "Claude", savedMin: 90, difficulty: "고급" },
    ],
  },
  {
    id: "wt6",
    job: "CS",
    icon: "🎧",
    color: "text-cyan-700",
    borderColor: "border-cyan-200",
    bgGradient: "from-cyan-50 to-sky-50",
    description: "고객 문의 분석부터 응대 스크립트까지, CS 품질을 높이세요.",
    workflows: [
      { task: "VOC 감성 분석·분류", tool: "ChatGPT", savedMin: 50, difficulty: "중급" },
      { task: "FAQ 응답 초안 작성", tool: "Claude", savedMin: 25, difficulty: "초급" },
      { task: "에스컬레이션 판단", tool: "Claude", savedMin: 15, difficulty: "초급" },
      { task: "CS 품질 리포트", tool: "ChatGPT", savedMin: 40, difficulty: "중급" },
    ],
  },
];
