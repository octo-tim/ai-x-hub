// ============================================================
// AI-X Hub Mock Data — 꿈비그룹 (유아용 제품 유통)
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
    title: "네이버 스마트스토어 상품 상세페이지 카피 생성",
    description:
      "유아용 제품 정보를 입력하면 네이버 스마트스토어에 최적화된 상세페이지 카피를 자동으로 생성합니다.",
    content: `당신은 유아용 제품 전문 이커머스 카피라이터입니다.\n\n아래 정보를 바탕으로 네이버 스마트스토어에 최적화된 상품 상세페이지 카피를 작성해 주세요.\n\n- 제품명: [제품명]\n- 제품 카테고리: [카테고리]\n- 핵심 소재/성분: [소재]\n- 타겟 연령: [타겟연령]\n- 주요 특장점: [특장점]\n- 경쟁 제품 대비 차별점: [차별점]\n\n출력 형식:\n1. SEO 최적화 상품명 (50자 이내, 핵심 키워드 포함)\n2. 한 줄 소구 카피 (부모 감성 자극)\n3. 상세페이지 본문 (특장점 3개 + 안전 인증 강조 + 사용 시나리오)\n4. 구매 후기 유도 문구\n5. 추천 해시태그 10개`,
    jobTag: "이커머스",
    purposeTag: "상세페이지",
    aiTool: "Claude",
    author: "최예린 · 온라인사업팀",
    copyCount: 487,
  },
  {
    id: "p2",
    title: "쿠팡 로켓그로스 키워드 광고 최적화",
    description:
      "쿠팡 광고 성과 데이터를 분석하고 키워드 입찰 전략을 자동으로 도출합니다.",
    content: `당신은 쿠팡 광고 최적화 전문가입니다.\n\n아래 광고 성과 데이터를 분석하고 [제품명]의 키워드 광고 전략을 수립해 주세요.\n\n- 제품명: [제품명]\n- 카테고리: [카테고리]\n- 월 광고비: [광고비]\n- 현재 주요 키워드: [키워드목록]\n- 전환율: [전환율]\n- ROAS: [ROAS]\n- 경쟁사 상품: [경쟁상품]\n\n분석 결과:\n1. 현재 키워드 효율 분석 (유지/제거/추가 추천)\n2. 신규 롱테일 키워드 20개 추천 (유아용품 특화)\n3. 시간대별 입찰가 조정 전략\n4. 예상 ROAS 개선율\n5. 주간 모니터링 체크리스트`,
    jobTag: "이커머스",
    purposeTag: "광고 최적화",
    aiTool: "Claude",
    author: "박민호 · 퍼포먼스마케팅팀",
    copyCount: 356,
  },
  {
    id: "p3",
    title: "육아맘 타겟 인스타그램 콘텐츠 기획",
    description:
      "제품과 시즌 정보를 입력하면 육아맘 타겟의 인스타그램 콘텐츠 시리즈를 기획합니다.",
    content: `당신은 유아용품 브랜드의 SNS 콘텐츠 전략가입니다.\n\n아래 정보를 바탕으로 육아맘 타겟 인스타그램 주간 콘텐츠 플랜을 작성해 주세요.\n\n- 브랜드: 꿈비\n- 이번 주 메인 제품: [제품명]\n- 시즌/이벤트: [시즌]\n- 아기 타겟 월령: [월령]\n- 톤앤매너: [톤]\n\n주간 플랜 (7일):\n각 포스트에 대해:\n1. 콘텐츠 유형 (릴스/카드뉴스/단일이미지/스토리)\n2. 제목 & 본문 카피 (이모지 포함)\n3. 비주얼 디렉션 설명\n4. 해시태그 15개 (육아 커뮤니티 키워드 포함)\n5. 최적 게시 시간`,
    jobTag: "마케팅",
    purposeTag: "SNS 콘텐츠",
    aiTool: "ChatGPT",
    author: "김하은 · 브랜드마케팅팀",
    copyCount: 312,
  },
  {
    id: "p4",
    title: "유아용품 고객 VOC 분석 및 개선 인사이트 도출",
    description:
      "네이버/쿠팡 고객 리뷰를 분석하여 제품 개선 포인트와 CS 대응 가이드를 자동 생성합니다.",
    content: `당신은 유아용품 전문 CX(고객경험) 분석가입니다.\n\n아래 고객 리뷰 데이터를 분석하고 [제품명]에 대한 종합 VOC 리포트를 작성해 주세요.\n\n- 제품명: [제품명]\n- 판매 채널: [채널]\n- 수집 기간: [기간]\n- 리뷰 데이터:\n[리뷰데이터]\n\n분석 결과:\n1. 감성 분석 요약 (긍정/부정/중립 비율)\n2. 주요 불만 TOP 5 (빈도순 + 원문 인용)\n3. 칭찬 포인트 TOP 5\n4. 경쟁사 제품 언급 분석\n5. 제품 개선 제안사항 3가지\n6. CS팀 FAQ 응대 스크립트 (불만 유형별)`,
    jobTag: "CS",
    purposeTag: "VOC 분석",
    aiTool: "Claude",
    author: "오지은 · 고객경험팀",
    copyCount: 523,
  },
  {
    id: "p5",
    title: "오프라인 매장 MD 발주량 예측 보고서",
    description:
      "시즌/트렌드 데이터를 입력하면 오프라인 매장별 적정 발주량 추천 리포트를 생성합니다.",
    content: `당신은 유아용품 유통 MD(머천다이저) 전문가입니다.\n\n아래 데이터를 분석하고 [매장명]의 다음 분기 적정 발주 계획을 수립해 주세요.\n\n- 매장명: [매장명]\n- 매장 유형: [매장유형]\n- 분석 기간 매출 데이터: [매출데이터]\n- 제품 카테고리: [카테고리]\n- 시즌 특이사항: [시즌]\n- 현재 재고 수준: [재고]\n\n보고서 항목:\n1. 카테고리별 판매 추이 분석\n2. 적정 발주량 추천 (SKU별)\n3. 시즌 특수 상품 추가 발주 제안\n4. 재고 회전율 개선 방안\n5. 전년 동기 대비 성장률 예측`,
    jobTag: "MD",
    purposeTag: "발주 기획",
    aiTool: "Claude",
    author: "이재현 · 오프라인영업팀",
    copyCount: 198,
  },
  {
    id: "p6",
    title: "Cafe24 자사몰 프로모션 기획안 생성",
    description:
      "시즌/이벤트에 맞춰 자사몰 프로모션 기획안과 배너 카피를 자동 생성합니다.",
    content: `당신은 유아용품 이커머스 프로모션 전략가입니다.\n\n아래 조건에 맞는 꿈비 자사몰(Cafe24) [시즌] 프로모션 기획안을 작성해 주세요.\n\n- 프로모션 시즌: [시즌]\n- 메인 프로모션 제품: [제품명]\n- 타겟 고객: [타겟]\n- 할인 예산: [예산]\n- 프로모션 기간: [기간]\n\n기획안 구성:\n1. 프로모션 컨셉 & 네이밍 (3개 시안)\n2. 메인/서브 배너 카피 (PC/모바일 각각)\n3. 할인 구조 설계 (단일할인/세트할인/쿠폰)\n4. 타임라인별 운영 계획\n5. KPI 설정 (매출/객단가/전환율 목표)\n6. SNS 연동 바이럴 전략`,
    jobTag: "이커머스",
    purposeTag: "프로모션",
    aiTool: "ChatGPT",
    author: "최예린 · 온라인사업팀",
    copyCount: 274,
  },
  {
    id: "p7",
    title: "유아용 매트 제품 안전 인증 서류 검토",
    description:
      "KC 인증 등 안전 규격 서류를 검토하고 누락 항목을 자동으로 체크합니다.",
    content: `당신은 유아용품 안전 인증 전문가입니다.\n\n아래 제품의 안전 인증 서류를 검토하고 누락 사항 및 리스크를 분석해 주세요.\n\n- 제품명: [제품명]\n- 제품 유형: [제품유형]\n- 인증 종류: [인증종류]\n- 주요 소재: [소재]\n- 검토 서류 내용:\n[서류내용]\n\n검토 결과:\n1. 필수 인증 항목 체크리스트 (충족/미충족)\n2. 누락된 시험 항목\n3. 소재별 유해물질 기준 적합 여부\n4. 표시사항 적정성 검토\n5. 보완 필요 서류 목록\n6. 예상 인증 소요 기간`,
    jobTag: "품질관리",
    purposeTag: "인증 검토",
    aiTool: "Claude",
    author: "한소희 · 품질관리팀",
    copyCount: 167,
  },
  {
    id: "p8",
    title: "거래처별 월간 매출 분석 보고서 생성",
    description:
      "거래처(쿠팡/네이버/자사몰/오프라인) 매출 데이터를 넣으면 채널별 분석 보고서를 생성합니다.",
    content: `당신은 유통 데이터 분석 전문가입니다.\n\n아래 꿈비그룹의 [기간] 거래처별 매출 데이터를 분석하고 경영진 보고용 리포트를 작성해 주세요.\n\n- 분석 기간: [기간]\n- 채널별 매출 데이터:\n[매출데이터]\n- 전월 대비 변동사항: [변동사항]\n- 주요 프로모션 이력: [프로모션]\n\n리포트 구성:\n1. 채널별 매출 요약 (표 형식)\n2. 전월/전년 동기 대비 증감률\n3. 채널별 객단가 및 주문건수 추이\n4. 베스트/워스트 상품 TOP 5\n5. 채널 믹스 최적화 제안\n6. 다음 달 매출 예측 및 전략 제언`,
    jobTag: "경영기획",
    purposeTag: "매출 분석",
    aiTool: "Claude",
    author: "송태호 · 경영기획팀",
    copyCount: 389,
  },
];

// ── Use Cases ────────────────────────────────────────────────
export const useCases: UseCase[] = [
  {
    id: "uc1",
    title: "쿠팡/네이버 상품 상세페이지 일괄 제작 자동화",
    jobTag: "이커머스",
    aiTool: "Claude",
    beforeHours: 24,
    afterHours: 4,
    savedHours: 20,
    resultSummary:
      "신규 시즌 런칭 시 50개 이상의 SKU 상세페이지를 Claude로 일괄 생성. 기존 디자이너+카피라이터 협업 구조에서 소요되던 3일을 반나절로 단축. 쿠팡/네이버/자사몰 각 채널별 톤에 맞게 자동 변환하여 멀티채널 동시 업로드 달성.",
    author: "최예린 · 온라인사업팀",
  },
  {
    id: "uc2",
    title: "육아맘 커뮤니티 트렌드 리서치 자동화",
    jobTag: "마케팅",
    aiTool: "Perplexity",
    beforeHours: 16,
    afterHours: 2,
    savedHours: 14,
    resultSummary:
      "맘카페, 인스타그램, 블로그 등에서 육아 트렌드와 경쟁사 반응을 Perplexity로 주 단위 자동 수집. 기존 마케팅팀 2명이 이틀 소요하던 리서치를 2시간으로 단축. '이유식 매트', '논슬립 아기띠' 등 신규 키워드 발굴로 신제품 기획에 기여.",
    author: "김하은 · 브랜드마케팅팀",
  },
  {
    id: "uc3",
    title: "오프라인 매장 발주/재고 분석 자동화",
    jobTag: "MD",
    aiTool: "Claude",
    beforeHours: 12,
    afterHours: 2,
    savedHours: 10,
    resultSummary:
      "전국 150개 매장의 POS 매출 데이터와 재고 현황을 Claude Code로 분석. 시즌별 적정 발주량을 자동 산출하여 과잉재고 23% 감소, 품절률 15% 개선. MD팀의 주간 리포트 작성 시간을 12시간에서 2시간으로 단축.",
    author: "이재현 · 오프라인영업팀",
  },
  {
    id: "uc4",
    title: "고객 리뷰 기반 제품 개선 인사이트 도출",
    jobTag: "CS",
    aiTool: "ChatGPT",
    beforeHours: 10,
    afterHours: 1.5,
    savedHours: 8.5,
    resultSummary:
      "월 5,000건 이상의 네이버/쿠팡 고객 리뷰를 ChatGPT로 자동 분류·감성 분석. '매트 미끄러짐', '세탁 후 변색' 등 제품 불만 패턴을 즉시 감지. R&D팀 연계로 다음 시즌 제품에 실제 개선 반영. CS 응대 시간 60% 단축.",
    author: "오지은 · 고객경험팀",
  },
  {
    id: "uc5",
    title: "거래처별 정산 및 수수료 분석 자동화",
    jobTag: "경영기획",
    aiTool: "Claude",
    beforeHours: 20,
    afterHours: 3,
    savedHours: 17,
    resultSummary:
      "쿠팡/네이버/Cafe24/이카운트 4개 시스템의 매출·정산·수수료 데이터를 Claude Code로 통합 분석. 채널별 실질 마진율을 자동 산출하고 경영진 대시보드를 생성. 기존 재무팀 수작업 Excel 비교 대비 85% 시간 절감, 정산 오류 0건 달성.",
    author: "송태호 · 경영기획팀",
  },
  {
    id: "uc6",
    title: "KC 인증 서류 사전 검토 자동화",
    jobTag: "품질관리",
    aiTool: "Claude",
    beforeHours: 8,
    afterHours: 1.5,
    savedHours: 6.5,
    resultSummary:
      "유아용 매트·완구·섬유 제품의 KC 안전인증 서류를 Claude로 사전 검토. 필수 시험 항목 누락, 유해물질 기준 초과 가능성을 사전에 감지. 외부 인증기관 반려율을 40%에서 5%로 대폭 감소시켜 인증 리드타임 3주 단축.",
    author: "한소희 · 품질관리팀",
  },
  {
    id: "uc7",
    title: "인스타그램 릴스 콘텐츠 기획·카피 자동화",
    jobTag: "마케팅",
    aiTool: "ChatGPT",
    beforeHours: 6,
    afterHours: 1,
    savedHours: 5,
    resultSummary:
      "주 5회 인스타그램 릴스 콘텐츠의 기획·카피·해시태그를 ChatGPT로 일괄 생성. 기존 크리에이티브 미팅 2시간 + 카피 작성 4시간을 1시간으로 단축. 게시물 인게이지먼트율 2.1%→3.8%로 향상.",
    author: "김하은 · 브랜드마케팅팀",
  },
  {
    id: "uc8",
    title: "신규 입사자 온보딩 & 제품 교육 자료 생성",
    jobTag: "HR",
    aiTool: "ChatGPT",
    beforeHours: 8,
    afterHours: 1.5,
    savedHours: 6.5,
    resultSummary:
      "부서별 맞춤 온보딩 가이드와 꿈비 제품 라인업 교육 자료를 ChatGPT로 자동 생성. 유아용품 산업 특성(안전 규격, 시즌 사이클, 유통 채널)을 반영한 교육 콘텐츠로 신규 입사자 적응 기간 2주→1주 단축.",
    author: "박지민 · 인사팀",
  },
];

// ── Dashboard Stats ──────────────────────────────────────────
export const dashboardStats = {
  totalPrompts: prompts.length,
  totalUseCases: useCases.length,
  totalSavedHours: useCases.reduce((sum, uc) => sum + uc.savedHours, 0),
  totalUsers: 127,
  monthlySavedHours: [
    { month: "2024.10", hours: 85 },
    { month: "2024.11", hours: 140 },
    { month: "2024.12", hours: 195 },
    { month: "2025.01", hours: 280 },
    { month: "2025.02", hours: 360 },
    { month: "2025.03", hours: 475 },
  ],
  topJobTags: [
    { tag: "이커머스", count: 42 },
    { tag: "마케팅", count: 35 },
    { tag: "MD", count: 28 },
    { tag: "경영기획", count: 24 },
    { tag: "CS", count: 18 },
  ],
};

// ── Current User ─────────────────────────────────────────────
export const currentUser = {
  name: "윤경식",
  team: "DX추진팀",
  avatar: "",
  points: 2_450,
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
    job: "온라인 이커머스",
    icon: "🛒",
    color: "text-blue-700",
    borderColor: "border-blue-200",
    bgGradient: "from-blue-50 to-sky-50",
    description: "쿠팡·네이버·자사몰 상품 등록부터 광고 최적화까지 AI로 가속하세요.",
    workflows: [
      { task: "상세페이지 카피 생성", tool: "Claude", savedMin: 45, difficulty: "초급" },
      { task: "쿠팡 키워드 광고 최적화", tool: "Claude", savedMin: 60, difficulty: "중급" },
      { task: "프로모션 기획안 작성", tool: "ChatGPT", savedMin: 90, difficulty: "중급" },
      { task: "멀티채널 가격 비교 분석", tool: "Claude", savedMin: 30, difficulty: "초급" },
    ],
  },
  {
    id: "wt2",
    job: "브랜드 마케팅",
    icon: "📣",
    color: "text-rose-700",
    borderColor: "border-rose-200",
    bgGradient: "from-rose-50 to-pink-50",
    description: "육아맘 타겟 SNS 콘텐츠부터 트렌드 리서치까지 마케팅을 혁신하세요.",
    workflows: [
      { task: "인스타 릴스 기획·카피", tool: "ChatGPT", savedMin: 50, difficulty: "초급" },
      { task: "육아 트렌드 리서치", tool: "Perplexity", savedMin: 90, difficulty: "초급" },
      { task: "블로그 체험단 모집 공고", tool: "Claude", savedMin: 30, difficulty: "초급" },
      { task: "캠페인 성과 리포트", tool: "Claude", savedMin: 75, difficulty: "중급" },
    ],
  },
  {
    id: "wt3",
    job: "오프라인 영업/MD",
    icon: "🏬",
    color: "text-emerald-700",
    borderColor: "border-emerald-200",
    bgGradient: "from-emerald-50 to-teal-50",
    description: "매장별 발주 분석, 재고 최적화, 입점 제안서를 AI로 자동화하세요.",
    workflows: [
      { task: "매장별 발주량 분석", tool: "Claude", savedMin: 60, difficulty: "중급" },
      { task: "시즌 트렌드 기반 MD 기획", tool: "Perplexity", savedMin: 45, difficulty: "초급" },
      { task: "신규 입점 제안서 작성", tool: "Claude", savedMin: 120, difficulty: "고급" },
      { task: "재고 회전율 분석 리포트", tool: "Claude", savedMin: 40, difficulty: "중급" },
    ],
  },
  {
    id: "wt4",
    job: "경영기획/재무",
    icon: "📊",
    color: "text-amber-700",
    borderColor: "border-amber-200",
    bgGradient: "from-amber-50 to-yellow-50",
    description: "채널별 매출 분석, 정산 검증, 경영 리포트를 AI로 효율화하세요.",
    workflows: [
      { task: "거래처별 매출 분석 리포트", tool: "Claude", savedMin: 90, difficulty: "중급" },
      { task: "채널 수수료/마진 계산", tool: "Claude", savedMin: 45, difficulty: "초급" },
      { task: "경영진 주간 보고서", tool: "Claude", savedMin: 60, difficulty: "중급" },
      { task: "사업계획서 초안", tool: "Claude", savedMin: 150, difficulty: "고급" },
    ],
  },
  {
    id: "wt5",
    job: "CS/고객경험",
    icon: "💬",
    color: "text-violet-700",
    borderColor: "border-violet-200",
    bgGradient: "from-violet-50 to-purple-50",
    description: "고객 리뷰 분석, 응대 스크립트, VOC 인사이트를 AI로 강화하세요.",
    workflows: [
      { task: "고객 리뷰 감성 분석", tool: "ChatGPT", savedMin: 50, difficulty: "중급" },
      { task: "불만 유형별 응대 스크립트", tool: "Claude", savedMin: 25, difficulty: "초급" },
      { task: "제품 개선 인사이트 도출", tool: "Claude", savedMin: 40, difficulty: "중급" },
      { task: "CS 품질 월간 리포트", tool: "ChatGPT", savedMin: 35, difficulty: "초급" },
    ],
  },
  {
    id: "wt6",
    job: "품질관리/R&D",
    icon: "🔬",
    color: "text-cyan-700",
    borderColor: "border-cyan-200",
    bgGradient: "from-cyan-50 to-sky-50",
    description: "KC 인증 검토, 소재 안전성 분석, 제품 스펙 비교를 AI로 수행하세요.",
    workflows: [
      { task: "KC 인증 서류 사전 검토", tool: "Claude", savedMin: 60, difficulty: "중급" },
      { task: "유해물질 기준 적합성 체크", tool: "Claude", savedMin: 30, difficulty: "초급" },
      { task: "경쟁사 제품 스펙 비교 분석", tool: "Perplexity", savedMin: 45, difficulty: "초급" },
      { task: "원자재 가격 동향 리서치", tool: "Perplexity", savedMin: 25, difficulty: "초급" },
    ],
  },
];
