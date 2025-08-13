import React, { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolioService';
import LiveQuotesList from './LiveQuotesList';
import './TabContent.css';

const MockInvestment = ({ user }) => {
  const [selectedStock, setSelectedStock] = useState('Apple');
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveInvestment, setIsActiveInvestment] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentStockData, setCurrentStockData] = useState(null);
  const [investmentSettings, setInvestmentSettings] = useState({
    portfolioTitle: '',
    totalAssets: '',
    assetUnit: 'USD', // 'USD' or 'KRW'
    startDate: '',
    endDate: '',
    riskLevel: 'medium'
  });

  // 포트폴리오 목록 가져오기
  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const portfolioData = await portfolioService.getPortfolios(user.id);
        setPortfolios(portfolioData);
      } catch (err) {
        console.error('포트폴리오 조회 실패:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, [user?.id]);

  // 포트폴리오 생성
  const handleCreatePortfolio = async () => {
    if (!investmentSettings.portfolioTitle.trim()) {
      alert('포트폴리오 제목을 입력해주세요.');
      return;
    }

    if (!user?.id) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newPortfolio = await portfolioService.createPortfolio(
        user.id, 
        investmentSettings.portfolioTitle
      );
      
      // 새 포트폴리오를 목록에 추가
      setPortfolios(prev => [...prev, newPortfolio]);
      
      // 설정 초기화
      setInvestmentSettings(prev => ({ ...prev, portfolioTitle: '' }));
      setShowPopup(false);
      
      alert('포트폴리오가 성공적으로 생성되었습니다!');
    } catch (err) {
      console.error('포트폴리오 생성 실패:', err);
      setError(err.message);
      alert('포트폴리오 생성에 실패했습니다: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 포트폴리오 삭제
  const handleDeletePortfolio = async (portfolioId, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await portfolioService.deletePortfolio(portfolioId);
      setPortfolios(prev => prev.filter(p => p.id !== portfolioId));
      alert('포트폴리오가 삭제되었습니다.');
    } catch (err) {
      console.error('포트폴리오 삭제 실패:', err);
      alert('포트폴리오 삭제에 실패했습니다: ' + err.message);
    }
  };

  // 포트폴리오 클릭 시 투자 화면으로 이동
  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsActiveInvestment(true);
  };

  // AI 분석 데이터 (미국주)
  const aiAnalysis = {
    Apple: {
      recommendation: '매수',
      confidence: '85%',
      analysis: 'Apple은 iPhone, Mac, iPad 등 프리미엄 제품 포트폴리오와 서비스 사업의 지속적인 성장으로 강력한 수익성을 보이고 있습니다. AI 기술 도입과 인도, 중국 등 신흥시장 진출이 주요 성장 동력입니다.',
      keyPoints: [
        'iPhone 15 시리즈 성공적 출시',
        '서비스 사업 매출 비중 확대',
        'AI 기술 도입 가속화',
        '신흥시장 진출 확대'
      ],
      riskFactors: [
        '중국 시장 의존도',
        '반도체 공급망 불확실성'
      ]
    },
    Microsoft: {
      recommendation: '매수',
      confidence: '90%',
      analysis: 'Microsoft는 Azure 클라우드 서비스와 AI 기술의 선도적 위치로 인해 지속적인 성장이 예상됩니다. OpenAI와의 파트너십과 Copilot 서비스가 주요 호재로 작용합니다.',
      keyPoints: [
        'Azure 클라우드 서비스 성장',
        'AI 기술 선도적 위치',
        'OpenAI 파트너십 강화',
        'Copilot 서비스 확대'
      ],
      riskFactors: [
        '클라우드 경쟁 심화',
        '규제 환경 변화'
      ]
    },
    NVIDIA: {
      recommendation: '매수',
      confidence: '95%',
      analysis: 'AI 칩 수요 급증과 데이터센터 시장 확대로 NVIDIA는 가장 강력한 성장 동력을 보이고 있습니다. H100, H200 등 차세대 AI 칩의 독점적 우위가 주요 강점입니다.',
      keyPoints: [
        'AI 칩 시장 독점적 우위',
        '데이터센터 수요 급증',
        '차세대 H200 칩 출시',
        '게임 시장 회복세'
      ],
      riskFactors: [
        '반도체 사이클 변동성',
        '경쟁사 기술 발전'
      ]
    },
    Tesla: {
      recommendation: '관망',
      confidence: '70%',
      analysis: '전기차 시장의 선도적 위치는 유지하지만, 가격 경쟁과 수요 둔화로 인한 불확실성이 존재합니다. FSD 기술과 로봇택시 사업이 장기 성장 동력입니다.',
      keyPoints: [
        '전기차 시장 선도적 위치',
        'FSD 기술 개발',
        '로봇택시 사업 확장',
        '글로벌 생산능력 확대'
      ],
      riskFactors: [
        '가격 경쟁 심화',
        '수요 둔화 우려'
      ]
    },
    Amazon: {
      recommendation: '매수',
      confidence: '80%',
      analysis: 'AWS 클라우드 서비스와 전자상거래 사업의 안정적 성장으로 Amazon은 지속적인 수익성 향상이 예상됩니다. AI 기술 투자와 광고 사업 확대가 주요 성장 동력입니다.',
      keyPoints: [
        'AWS 클라우드 서비스 성장',
        '전자상거래 시장 점유율 확대',
        'AI 기술 투자 확대',
        '광고 사업 성장'
      ],
      riskFactors: [
        '규제 환경 변화',
        '노동 비용 상승'
      ]
    }
  };

  const currentAnalysis = aiAnalysis[selectedStock] || aiAnalysis['Apple'];

  const handleStartInvestment = () => {
    setIsActiveInvestment(true);
    setShowPopup(false);
  };

  const handleCancelInvestment = () => {
    setIsActiveInvestment(false);
    setShowPopup(false);
  };

  const handleReturnToHome = () => {
    setIsActiveInvestment(false);
    setSelectedStock('Apple');
    setSelectedPortfolio(null);
  };

  const handleStockSelect = (stockName) => {
    setSelectedStock(stockName);
  };

  // LiveQuotesList에서 주가 데이터를 받아오기 위한 콜백
  const handleStockData = (stockData) => {
    // stockData는 { symbol, price, change } 형태
    console.log('선택된 주식 데이터:', stockData);
    setCurrentStockData(stockData);
  };

  // 주가 정보 포맷팅
  const formatStockPrice = (stockData) => {
    if (!stockData || !stockData.price) return '로딩 중...';
    return `$${stockData.price.toLocaleString()}`;
  };

  const formatStockChange = (stockData) => {
    if (!stockData) return '로딩 중...';
    
    // 달러 변화량 우선 사용
    if (stockData.dollarChange !== null && stockData.dollarChange !== undefined) {
      const sign = stockData.dollarChange > 0 ? '+' : (stockData.dollarChange < 0 ? '-' : '');
      return `${sign}$${Math.abs(stockData.dollarChange).toFixed(2)}`;
    }
    
    // 퍼센트 변화량 사용
    if (typeof stockData.change === 'number') {
      const sign = stockData.change > 0 ? '+' : (stockData.change < 0 ? '-' : '');
      return `${sign}${Math.abs(stockData.change).toFixed(2)}%`;
    }
    
    return '로딩 중...';
  };

  const getChangeClass = (stockData) => {
    if (!stockData) return '';
    
    // 달러 변화량 우선 사용
    if (stockData.dollarChange !== null && stockData.dollarChange !== undefined) {
      return stockData.dollarChange >= 0 ? 'positive' : 'negative';
    }
    
    // 퍼센트 변화량 사용
    if (typeof stockData.change === 'number') {
      return stockData.change >= 0 ? 'positive' : 'negative';
    }
    
    return '';
  };

  // 기존 포트폴리오 목록 화면
  if (!isActiveInvestment) {
    return (
      <div className="tab-content">
        <div className="content-header">
          <h1>모의투자</h1>
          <p>기존 포트폴리오와 새로운 모의투자 시작</p>
        </div>
        
        <div className="content-grid">
          {/* 기존 포트폴리오 목록 */}
          <div className="content-card">
            <h3>내 포트폴리오 목록</h3>
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            {isLoading ? (
              <div className="loading-message">
                <p>포트폴리오를 불러오는 중...</p>
              </div>
            ) : portfolios.length === 0 ? (
              <div className="empty-portfolio">
                <p>아직 생성된 포트폴리오가 없습니다.</p>
                <p>새로운 모의투자를 시작해보세요!</p>
              </div>
            ) : (
            <div className="portfolio-list">
                {portfolios.map((portfolio) => (
                  <div 
                    key={portfolio.id} 
                    className="portfolio-item"
                    onClick={() => handlePortfolioClick(portfolio)}
                    style={{ cursor: 'pointer' }}
                  >
                  <div className="portfolio-header">
                    <h4>{portfolio.name}</h4>
                      <div className="portfolio-actions">
                        <button 
                          className="delete-btn"
                          onClick={(e) => handleDeletePortfolio(portfolio.id, e)}
                          title="포트폴리오 삭제"
                        >
                          삭제
                        </button>
                      </div>
                  </div>
                  <div className="portfolio-details">
                    <div className="portfolio-info">
                        <span>생성일: {new Date(portfolio.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
            
            {/* 모의투자 시작 버튼 */}
             <div className="start-investment-container">
               <button 
                 className="start-investment-btn"
                 onClick={() => setShowPopup(true)}
                disabled={isLoading}
               >
                 새 모의투자 시작하기
               </button>
             </div>
          </div>
        </div>

                 {/* 모의투자 시작 팝업 */}
         {showPopup && (
           <div className="popup-overlay">
             <div className="investment-popup">
               <h3>새로운 모의투자 설정</h3>
               
               <div className="investment-settings">
                 <div className="setting-group">
                   <label>포트폴리오 제목</label>
                   <input
                     type="text"
                     placeholder="포트폴리오 제목을 입력하세요"
                     value={investmentSettings.portfolioTitle}
                     onChange={e => setInvestmentSettings({
                       ...investmentSettings,
                       portfolioTitle: e.target.value
                     })}
                     className="asset-input"
                    disabled={isLoading}
                   />
                 </div>
               </div>

               <div className="popup-buttons">
                <button 
                  className="cancel-btn" 
                  onClick={handleCancelInvestment}
                  disabled={isLoading}
                >
                   취소
                 </button>
                <button 
                  className="start-btn" 
                  onClick={handleCreatePortfolio}
                  disabled={isLoading}
                >
                  {isLoading ? '생성 중...' : '포트폴리오 생성'}
                 </button>
               </div>
             </div>
           </div>
         )}
      </div>
    );
  }

  // 활성 모의투자 화면
  return (
    <div className="tab-content">
      <div className="content-header">
        <div className="header-with-button">
          <div className="header-content">
            <h1>모의투자 진행중</h1>
            <p>실시간 시장 데이터를 기반으로 한 모의 투자 환경</p>
            {selectedPortfolio && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                포트폴리오: {selectedPortfolio.name}
              </p>
            )}
          </div>
          <button className="home-button" onClick={handleReturnToHome}>
            모의투자 홈
          </button>
        </div>
      </div>
      
      <div className="investment-layout">
        {/* 왼쪽: AI 분석 영역 */}
        <div className="ai-analysis-section">
          <div className="content-card">
            <h3>AI 투자 분석</h3>
            <div className="selected-stock-info">
              <h4>{selectedStock}</h4>
              <div className="stock-price-info">
                <span className="current-price">{formatStockPrice(currentStockData)}</span>
                <span className={`price-change ${getChangeClass(currentStockData)}`}>
                  {formatStockChange(currentStockData)}
                </span>
              </div>
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
        
        {/* 오른쪽: 실시간 주식 리스트뷰 */}
        <div className="stock-list-section">
          <div className="content-card">
            <h3>실시간 주식 목록</h3>
            
            {/* 실시간 주식 리스트 */}
            <div className="stock-list-container" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <LiveQuotesList 
                onStockSelect={handleStockSelect}
                selectedStock={selectedStock}
                onStockData={handleStockData}
              />
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

export default MockInvestment; 