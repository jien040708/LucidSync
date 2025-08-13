import React, { useState } from 'react';
import './TabContent.css';

const MyStocks = () => {
  const [selectedStock, setSelectedStock] = useState('삼성전자');
  const [searchTerm, setSearchTerm] = useState('');
  const [listViewTab, setListViewTab] = useState('myStocks'); // 리스트뷰 탭 상태

  // 보유 주식 데이터
  const myStocks = [
    { name: '삼성전자', price: '₩75,000', change: '+2.1%', changeType: 'positive', sector: '반도체', quantity: 10, avgPrice: '₩72,000', profit: '+₩30,000', profitRate: '+4.2%' },
    { name: 'SK하이닉스', price: '₩125,000', change: '-1.3%', changeType: 'negative', sector: '반도체', quantity: 5, avgPrice: '₩128,000', profit: '-₩15,000', profitRate: '-2.3%' },
    { name: 'NAVER', price: '₩220,000', change: '+0.8%', changeType: 'positive', sector: 'IT', quantity: 8, avgPrice: '₩215,000', profit: '+₩40,000', profitRate: '+2.3%' },
    { name: '카카오', price: '₩45,000', change: '+1.2%', changeType: 'positive', sector: 'IT', quantity: 15, avgPrice: '₩42,000', profit: '+₩45,000', profitRate: '+7.1%' },
    { name: 'LG화학', price: '₩450,000', change: '-0.5%', changeType: 'negative', sector: '화학', quantity: 3, avgPrice: '₩455,000', profit: '-₩15,000', profitRate: '-1.1%' },
    { name: '현대차', price: '₩180,000', change: '+3.2%', changeType: 'positive', sector: '자동차', quantity: 7, avgPrice: '₩175,000', profit: '+₩35,000', profitRate: '+2.9%' },
    { name: '기아', price: '₩85,000', change: '+2.8%', changeType: 'positive', sector: '자동차', quantity: 12, avgPrice: '₩82,000', profit: '+₩36,000', profitRate: '+3.7%' },
    { name: 'POSCO홀딩스', price: '₩380,000', change: '-0.8%', changeType: 'negative', sector: '철강', quantity: 4, avgPrice: '₩385,000', profit: '-₩20,000', profitRate: '-1.3%' },
    { name: 'LG전자', price: '₩95,000', change: '+1.5%', changeType: 'positive', sector: '전자', quantity: 9, avgPrice: '₩93,000', profit: '+₩18,000', profitRate: '+2.2%' },
    { name: 'KB금융', price: '₩55,000', change: '+0.3%', changeType: 'positive', sector: '금융', quantity: 20, avgPrice: '₩54,500', profit: '+₩10,000', profitRate: '+0.9%' }
  ];

  // 전체 주식 데이터 (보유 주식 + 추가 주식)
  const allStocks = [
    // 보유 주식들
    ...myStocks.map(stock => ({ ...stock, isHolding: true })),
    
    // 추가 주식들
    { name: '테슬라', price: '₩280,000', change: '+5.2%', changeType: 'positive', sector: '자동차', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '애플', price: '₩320,000', change: '+1.8%', changeType: 'positive', sector: 'IT', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '마이크로소프트', price: '₩450,000', change: '+2.3%', changeType: 'positive', sector: 'IT', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '구글', price: '₩380,000', change: '+0.9%', changeType: 'positive', sector: 'IT', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '아마존', price: '₩520,000', change: '-1.2%', changeType: 'negative', sector: 'IT', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '넷플릭스', price: '₩180,000', change: '+3.1%', changeType: 'positive', sector: '미디어', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '페이팔', price: '₩95,000', change: '-0.7%', changeType: 'negative', sector: '금융', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '비자', price: '₩280,000', change: '+1.4%', changeType: 'positive', sector: '금융', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '존슨앤존슨', price: '₩320,000', change: '+0.6%', changeType: 'positive', sector: '제약', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '화이자', price: '₩85,000', change: '-2.1%', changeType: 'negative', sector: '제약', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '코카콜라', price: '₩120,000', change: '+0.8%', changeType: 'positive', sector: '소비재', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '프록터앤갬블', price: '₩180,000', change: '+1.2%', changeType: 'positive', sector: '소비재', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '월마트', price: '₩95,000', change: '-0.3%', changeType: 'negative', sector: '소매', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '홈디포', price: '₩220,000', change: '+2.7%', changeType: 'positive', sector: '소매', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '엑슨모빌', price: '₩180,000', change: '+1.9%', changeType: 'positive', sector: '에너지', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false },
    { name: '셰브론', price: '₩160,000', change: '+1.5%', changeType: 'positive', sector: '에너지', quantity: 0, avgPrice: '-', profit: '-', profitRate: '-', isHolding: false }
  ];

  // 현재 표시할 주식 데이터
  const currentStocks = listViewTab === 'myStocks' ? myStocks : allStocks;

  // 검색 필터링
  const filteredStocks = currentStocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.sector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // AI 분석 데이터
  const aiAnalysis = {
    삼성전자: {
      recommendation: '매수',
      confidence: '85%',
      analysis: '반도체 업종의 회복세와 AI 수요 증가로 인해 삼성전자는 강력한 성장 동력을 보이고 있습니다. 메모리 반도체 가격 상승과 AI 칩 수요 증가가 주요 호재로 작용할 것으로 예상됩니다.',
      keyPoints: [
        '메모리 반도체 가격 상승세 지속',
        'AI 칩 수요 급증',
        '글로벌 시장 점유율 확대',
        '차세대 기술 개발 우위'
      ],
      riskFactors: [
        '반도체 사이클 변동성',
        '글로벌 경기 침체 우려'
      ]
    },
    'SK하이닉스': {
      recommendation: '관망',
      confidence: '70%',
      analysis: '반도체 업종의 회복세가 예상되지만, 단기적으로는 메모리 가격 변동성으로 인한 불확실성이 존재합니다. 장기적으로는 AI 수요 증가로 인한 성장 가능성이 높습니다.',
      keyPoints: [
        '메모리 가격 변동성 존재',
        'AI 수요 증가 전망',
        '기술 경쟁력 우수',
        '장기 성장 가능성'
      ],
      riskFactors: [
        '단기 가격 변동성',
        '경쟁사 기술 발전'
      ]
    },
    NAVER: {
      recommendation: '매수',
      confidence: '80%',
      analysis: 'AI 기술 투자 확대와 플랫폼 사업의 안정적 성장으로 NAVER는 지속적인 성장이 예상됩니다. 특히 AI 분야에서의 기술적 우위가 주요 강점입니다.',
      keyPoints: [
        'AI 기술 투자 확대',
        '플랫폼 사업 안정성',
        '글로벌 진출 가속화',
        '신규 사업 확장'
      ],
      riskFactors: [
        '규제 환경 변화',
        '경쟁 심화'
      ]
    }
  };

  const currentAnalysis = aiAnalysis[selectedStock] || aiAnalysis['삼성전자'];
  const selectedStockData = currentStocks.find(s => s.name === selectedStock);

  return (
    <div className="tab-content">
      <div className="content-header">
        <h1>나의 주식</h1>
        <p>보유 주식 현황과 포트폴리오 분석</p>
      </div>
      
      <div className="investment-layout">
        {/* 왼쪽: AI 분석 영역 */}
        <div className="ai-analysis-section">
          <div className="content-card">
            <h3>AI 투자 분석</h3>
            <div className="selected-stock-info">
              <h4>{selectedStock}</h4>
              <div className="stock-price-info">
                <span className="current-price">{selectedStockData?.price}</span>
                <span className={`price-change ${selectedStockData?.changeType}`}>
                  {selectedStockData?.change}
                </span>
              </div>
              {selectedStockData && selectedStockData.quantity > 0 && (
                <div className="holding-details">
                  <div className="holding-summary">
                    <span>보유: {selectedStockData.quantity}주</span>
                    <span>평균단가: {selectedStockData.avgPrice}</span>
                    <span className={`profit ${selectedStockData.profitRate.startsWith('+') ? 'positive' : 'negative'}`}>
                      {selectedStockData.profit} ({selectedStockData.profitRate})
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="ai-recommendation">
              <div className="recommendation-badge">
                <span className="recommendation-text">{currentAnalysis.recommendation}</span>
                <span className="confidence-score">신뢰도: {currentAnalysis.confidence}</span>
              </div>
            </div>
            
            <div className="analysis-content">
              <h5>투자 분석</h5>
              <p>{currentAnalysis.analysis}</p>
              
              <h5>주요 포인트</h5>
              <ul className="key-points">
                {currentAnalysis.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              
              <h5>위험 요소</h5>
              <ul className="risk-factors">
                {currentAnalysis.riskFactors.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* 오른쪽: 보유 주식 리스트뷰 */}
        <div className="stock-list-section">
          <div className="content-card">
            <h3>주식 목록</h3>
            
            {/* 리스트뷰 탭 네비게이션 */}
            <div className="list-view-tabs">
              <button
                className={`list-tab ${listViewTab === 'myStocks' ? 'active' : ''}`}
                onClick={() => setListViewTab('myStocks')}
              >
                보유주식
              </button>
              <button
                className={`list-tab ${listViewTab === 'allStocks' ? 'active' : ''}`}
                onClick={() => setListViewTab('allStocks')}
              >
                전체주식
              </button>
            </div>
            
            {/* 검색바 */}
            <div className="search-container">
              <input
                type="text"
                placeholder="주식명 또는 섹터로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="stock-search"
              />
            </div>
            
            {/* 주식 리스트 */}
            <div className="stock-list-container">
              {filteredStocks.map((stock, index) => (
                <div
                  key={index}
                  className={`stock-list-item ${selectedStock === stock.name ? 'selected' : ''}`}
                  onClick={() => setSelectedStock(stock.name)}
                >
                  <div className="stock-info">
                    <div className="stock-name-sector">
                      <span className="stock-name">
                        {stock.name}
                        {stock.isHolding && <span className="holding-badge">보유</span>}
                      </span>
                      <span className="stock-sector">{stock.sector}</span>
                      {stock.quantity > 0 && (
                        <span className="stock-quantity">보유: {stock.quantity}주</span>
                      )}
                    </div>
                    <div className="stock-price-change">
                      <span className="stock-price">{stock.price}</span>
                      <span className={`stock-change ${stock.changeType}`}>
                        {stock.change}
                      </span>
                      {stock.quantity > 0 && (
                        <span className={`profit ${stock.profitRate.startsWith('+') ? 'positive' : 'negative'}`}>
                          {stock.profit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 매수/매도 버튼 */}
            <div className="trading-buttons">
              <button className="buy-button">
                매수
              </button>
              <button className="sell-button">
                매도
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStocks; 