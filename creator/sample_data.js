// Sample flashcard datasets for various subjects with LaTeX formulas
const SAMPLE_PACKS = {
  finance_pack: {
    name: "Corporate Finance & Investments (18 Cards)",
    description: "Core concepts of Finance, Time Value of Money, Portfolio Theory, and Investment Analysis.",
    cards: [
      {
        "id": 1,
        "category": "Financial Foundations",
        "theme": "cyan",
        "front": {
          "title": "Time Value"
        },
        "back": {
          "title": "Time Value of Money",
          "tagline": "Money today is worth more than equal money later.",
          "summary": "TVM reflects earning potential, inflation, and risk through discounting or compounding future cash flows.",
          "table": {
            "headers": ["Concept", "Direction"],
            "rows": [
              ["Compounding", "Future value"],
              ["Discounting", "Present value"]
            ]
          }
        }
      },
      {
        "id": 2,
        "category": "Financial Foundations",
        "theme": "cyan",
        "front": {
          "title": "Compound Interest"
        },
        "back": {
          "title": "Compounding Mechanics",
          "tagline": "Interest earns further interest over time.",
          "summary": "Compound growth calculates returns on both principal and accumulated interest.",
          "key_points": [
            "Formula: $$\\text{FV} = \\text{PV} \\times (1 + r)^n$$",
            "Mnemonic: Interest on interest builds wealth."
          ],
          "diagram": "PV -> Interest -> FV"
        }
      },
      {
        "id": 3,
        "category": "Financial Foundations",
        "theme": "cyan",
        "front": {
          "title": "Annuities"
        },
        "back": {
          "title": "Annuity Valuation",
          "tagline": "Annuities contain equal cash flows at regular intervals.",
          "summary": "Ordinary annuities pay at period-end; annuities due pay at period-beginning.",
          "table": {
            "headers": ["Type", "Payment Timing"],
            "rows": [
              ["Ordinary", "Period end"],
              ["Due", "Period start"]
            ]
          },
          "diagram": "PMT -> PMT -> PMT"
        }
      },
      {
        "id": 4,
        "category": "Investment Analysis",
        "theme": "orange",
        "front": {
          "title": "NPV"
        },
        "back": {
          "title": "Net Present Value",
          "tagline": "NPV measures value created after discounting project cash flows.",
          "summary": "NPV measures value creation: $$\\text{NPV} = \\sum \\frac{C_t}{(1+r)^t} - C_0$$",
          "key_points": [
            "Accept independent projects when NPV > 0.",
            "NPV measures absolute wealth creation."
          ]
        }
      },
      {
        "id": 5,
        "category": "Investment Analysis",
        "theme": "orange",
        "front": {
          "title": "IRR"
        },
        "back": {
          "title": "Internal Rate Return",
          "tagline": "IRR is the discount rate making project NPV zero.",
          "summary": "IRR expresses project returns as a percentage. It is the rate $r$ that solves $$\\text{NPV} = 0$$",
          "table": {
            "headers": ["Rule", "Meaning"],
            "rows": [
              ["IRR > WACC", "Accept project"],
              ["IRR < WACC", "Reject project"]
            ]
          }
        }
      },
      {
        "id": 6,
        "category": "Investment Analysis",
        "theme": "orange",
        "front": {
          "title": "Payback Period"
        },
        "back": {
          "title": "Payback Analysis",
          "tagline": "Payback measures how quickly investment cash flows recover cost.",
          "summary": "It is simple and liquidity-focused but ignores post-payback cash flows and the time value of money.",
          "key_points": [
            "Shorter payback indicates faster capital recovery.",
            "Formula: $$\\text{Payback} = \\frac{\\text{Initial Cost}}{\\text{Annual Cashflow}}$$"
          ],
          "diagram": "Investment -> Recovery"
        }
      },
      {
        "id": 7,
        "category": "Risk and Return",
        "theme": "purple",
        "front": {
          "title": "Systematic Risk"
        },
        "back": {
          "title": "Systematic Risk",
          "tagline": "Systematic risk affects broad markets and cannot be diversified away.",
          "summary": "Also called market risk, it is driven by broad economic factors like recessions, inflation, and interest-rate changes.",
          "table": {
            "headers": ["Risk Type", "Market Impact Factor"],
            "rows": [
              ["Market", "Recession / GDP"],
              ["Rate", "Inflation / Policy"]
            ]
          }
        }
      },
      {
        "id": 8,
        "category": "Risk and Return",
        "theme": "purple",
        "front": {
          "title": "Unsystematic Risk"
        },
        "back": {
          "title": "Unsystematic Risk",
          "tagline": "Firm-specific risk can be reduced through diversification.",
          "summary": "Arises from company-specific events. Mnemonic: **SPUD** (Specific, Peculiar, Unique, Diversifiable risk).",
          "key_points": [
            "Diversification spreads asset-specific risk exposures.",
            "Firm-specific risk is not rewarded by markets."
          ]
        }
      },
      {
        "id": 9,
        "category": "Risk and Return",
        "theme": "purple",
        "front": {
          "title": "CAPM"
        },
        "back": {
          "title": "Capital Asset Pricing",
          "tagline": "CAPM links expected return with systematic market risk.",
          "summary": "Expected asset return formula: $$\\text{E}(R_i) = R_f + \\beta_i [\\text{E}(R_m) - R_f]$$",
          "table": {
            "headers": ["Variable", "Meaning"],
            "rows": [
              ["$$\\beta$$", "Systematic risk"],
              ["$$R_f$$", "Risk-free rate"]
            ]
          }
        }
      },
      {
        "id": 10,
        "category": "Portfolio Theory",
        "theme": "emerald",
        "front": {
          "title": "Diversification"
        },
        "back": {
          "title": "Portfolio Diversification",
          "tagline": "Combining assets can reduce portfolio-specific risk.",
          "summary": "Works when asset returns are not perfectly positively correlated (i.e. correlation coefficient $$\\rho < +1$$).",
          "key_points": [
            "Correlation below +1 creates diversification benefits.",
            "Spreads out company-specific exposures."
          ]
        }
      },
      {
        "id": 11,
        "category": "Portfolio Theory",
        "theme": "emerald",
        "front": {
          "title": "Efficient Frontier"
        },
        "back": {
          "title": "Efficient Frontier",
          "tagline": "Efficient portfolios maximize return for each level of risk.",
          "summary": "Portfolios offering the highest expected return for their risk. Mnemonic: Up and to the left is best.",
          "table": {
            "headers": ["Goal", "Risk Tradeoff"],
            "rows": [
              ["High return", "Higher risk"],
              ["Low risk", "Lower return"]
            ]
          }
        }
      },
      {
        "id": 12,
        "category": "Portfolio Theory",
        "theme": "emerald",
        "front": {
          "title": "Sharpe Ratio"
        },
        "back": {
          "title": "Sharpe Ratio",
          "tagline": "Sharpe measures excess return earned per unit of total risk.",
          "summary": "Risk-adjusted performance metrics: $$\\text{Sharpe} = \\frac{\\text{E}(R_p) - R_f}{\\sigma_p}$$",
          "key_points": [
            "Higher Sharpe indicates better risk-adjusted return.",
            "$$\\sigma_p$$ represents total portfolio volatility."
          ]
        }
      },
      {
        "id": 13,
        "category": "Capital Structure",
        "theme": "gold",
        "front": {
          "title": "Cost of Capital"
        },
        "back": {
          "title": "Weighted Average Cost",
          "tagline": "WACC represents the blended cost of company financing.",
          "summary": "WACC formula incorporating corporate tax rate $T_c$: $$\\text{WACC} = \\left(\\frac{E}{V}\\right)R_e + \\left(\\frac{D}{V}\\right)R_d(1-T_c)$$",
          "table": {
            "headers": ["Source", "Weight"],
            "rows": [
              ["Equity (E/V)", "Market share"],
              ["Debt (D/V)", "Market share"]
            ]
          }
        }
      },
      {
        "id": 14,
        "category": "Capital Structure",
        "theme": "gold",
        "front": {
          "title": "Leverage"
        },
        "back": {
          "title": "Financial Leverage",
          "tagline": "Debt magnifies both shareholder returns and financial risk.",
          "summary": "Leverage increases earnings sensitivity to operating performance: $$\\text{ROE} = \\text{ROA} + (\\text{ROA} - R_d)\\frac{D}{E}$$",
          "key_points": [
            "Debt increases ROE when ROA exceeds borrowing cost.",
            "Excessive leverage raises default and bankruptcy risk."
          ]
        }
      },
      {
        "id": 15,
        "category": "Financial Analysis",
        "theme": "gold",
        "front": {
          "title": "Liquidity Ratios"
        },
        "back": {
          "title": "Liquidity Ratios",
          "tagline": "Liquidity ratios assess ability to meet short-term obligations.",
          "summary": "Compares current obligations with near-cash resources.",
          "table": {
            "headers": ["Ratio", "Formula"],
            "rows": [
              ["Current", "$$\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$$"],
              ["Quick", "$$\\frac{\\text{Quick Assets}}{\\text{Current Liabilities}}$$" ]
            ]
          }
        }
      },
      {
        "id": 16,
        "category": "Financial Analysis",
        "theme": "gold",
        "front": {
          "title": "Profitability Ratios"
        },
        "back": {
          "title": "Profitability Ratios",
          "tagline": "Profitability ratios evaluate earnings generated from resources.",
          "summary": "Margins evaluate sales efficiency, while ROA and ROE evaluate resource returns.",
          "key_points": [
            "Formula: $$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Equity}}$$",
            "Formula: $$\\text{ROA} = \\frac{\\text{Net Income}}{\\text{Assets}}$$"
          ]
        }
      },
      {
        "id": 17,
        "category": "Corporate Finance",
        "theme": "orange",
        "front": {
          "title": "Working Capital"
        },
        "back": {
          "title": "Working Capital Cycle",
          "tagline": "Working capital manages short-term operating assets and liabilities.",
          "summary": "Net operating cycle measures time elapsed between paying for inputs and collecting sales cash.",
          "table": {
            "headers": ["Component", "Measure"],
            "rows": [
              ["Inventory", "Days Inventory Outstanding"],
              ["Receivables", "Days Sales Outstanding"]
            ]
          }
        }
      },
      {
        "id": 18,
        "category": "Financial Markets",
        "theme": "cyan",
        "front": {
          "title": "Bond Valuation"
        },
        "back": {
          "title": "Bond Valuation",
          "tagline": "Bond price equals present value of coupons and principal.",
          "summary": "Present value formula: $$\\text{Price} = \\sum_{t=1}^T \\frac{C}{(1+r)^t} + \\frac{M}{(1+r)^T}$$",
          "key_points": [
            "Interest rates rise -> Bond price falls.",
            "Mnemonic: Rates and prices sit on a seesaw."
          ]
        }
      },
      {
        "id": 19,
        "category": "Equity Valuation",
        "theme": "cyan",
        "front": {
          "title": "Dividend Discount"
        },
        "back": {
          "title": "Dividend Discount Model",
          "tagline": "Stock price equals the present value of future dividends.",
          "summary": "Valuation model where expected dividends grow at a constant rate $g$.",
          "key_points": [
            "Formula: $$P_0 = \\frac{D_1}{r - g}$$",
            "Mnemonic: Gordon growth divides next dividend by rate minus growth."
          ]
        }
      },
      {
        "id": 20,
        "category": "Risk and Return",
        "theme": "purple",
        "front": {
          "title": "Beta"
        },
        "back": {
          "title": "Asset Beta Mechanics",
          "tagline": "Beta measures systematic sensitivity to market movements.",
          "summary": "Formula: $$\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\sigma_m^2}$$",
          "table": {
            "headers": ["Beta Value", "Market Relationship"],
            "rows": [
              ["Beta > 1", "More volatile than market"],
              ["Beta < 1", "Less volatile than market"]
            ]
          }
        }
      },
      {
        "id": 21,
        "category": "Financial Markets",
        "theme": "cyan",
        "front": {
          "title": "Modified Duration"
        },
        "back": {
          "title": "Interest Rate Sensitivity",
          "tagline": "Modified duration measures price volatility given yield changes.",
          "summary": "Formula: $$\\text{ModD} = \\frac{\\text{Macaulay Duration}}{1 + r}$$",
          "key_points": [
            "Price change: $$\\Delta P/P \\approx -\\text{ModD} \\times \\Delta y$$",
            "Higher coupon bonds have lower duration."
          ]
        }
      },
      {
        "id": 22,
        "category": "Financial Analysis",
        "theme": "gold",
        "front": {
          "title": "DuPont Analysis"
        },
        "back": {
          "title": "DuPont ROE Breakdown",
          "tagline": "Deconstructs ROE into operating, asset, and leverage efficiency.",
          "summary": "ROE splits into profit margin, asset turnover, and equity multiplier.",
          "table": {
            "headers": ["Component", "Measure"],
            "rows": [
              ["Profit Margin", "$$\\frac{\\text{Net Income}}{\\text{Sales}}$$"        ],
              ["Asset Turnover", "$$\\frac{\\text{Sales}}{\\text{Assets}}$$"        ],
              ["Equity Multiplier", "$$\\frac{\\text{Assets}}{\\text{Equity}}$$"  ]
            ]
          }
        }
      },
      {
        "id": 23,
        "category": "Capital Structure",
        "theme": "gold",
        "front": {
          "title": "Cost of Debt"
        },
        "back": {
          "title": "After-Tax Cost of Debt",
          "tagline": "Interest tax shields reduce the effective borrowing rate.",
          "summary": "Corporate debt interest is tax-deductible, reducing net borrowing costs.",
          "key_points": [
            "Formula: $$r_{\\text{after-tax}} = r_d \\times (1 - T_c)$$",
            "Mnemonic: Uncle Sam pays part of your interest."
          ]
        }
      },
      {
        "id": 24,
        "category": "Capital Structure",
        "theme": "gold",
        "front": {
          "title": "Cost of Equity"
        },
        "back": {
          "title": "Cost of Equity Capital",
          "tagline": "Equity cost is the return demanded by equity investors.",
          "summary": "Calculated via CAPM or dividend capitalization models.",
          "table": {
            "headers": ["Model", "Formula"],
            "rows": [
              ["CAPM", "$$R_f + \\beta(R_m - R_f)$$"  ],
              ["Gordon", "$$\\frac{D_1}{P_0} + g$$"       ]
            ]
          }
        }
      },
      {
        "id": 25,
        "category": "Derivatives",
        "theme": "emerald",
        "front": {
          "title": "Put-Call Parity"
        },
        "back": {
          "title": "Put-Call Parity",
          "tagline": "Equates prices of European call and put options.",
          "summary": "Arbitrage-free relationship: $$C + PV(K) = P + S$$",
          "key_points": [
            "C = Call, P = Put, S = Stock, K = Strike.",
            "Mnemonic: Cows Plus Disks Equal People Singing."
          ]
        }
      },
      {
        "id": 26,
        "category": "Capital Budgeting",
        "theme": "orange",
        "front": {
          "title": "Profitability Index"
        },
        "back": {
          "title": "Profitability Index",
          "tagline": "PI measures value created per dollar invested.",
          "summary": "Formula: $$\\text{PI} = \\frac{\\text{PV of Cash Flows}}{\\text{Initial Investment}}$$",
          "table": {
            "headers": ["Value", "Decision"],
            "rows": [
              ["PI > 1", "Accept project"],
              ["PI < 1", "Reject project"]
            ]
          }
        }
      },
      {
        "id": 27,
        "category": "Risk and Return",
        "theme": "purple",
        "front": {
          "title": "APT"
        },
        "back": {
          "title": "Arbitrage Pricing Theory",
          "tagline": "APT prices assets using multiple macro economic risk factors.",
          "summary": "Multi-factor model: $$\\text{E}(R_i) = R_f + \\sum \\beta_{ij} \\lambda_j$$",
          "key_points": [
            "Does not assume single market portfolio.",
            "Factors: inflation, GDP, yield spreads."
          ]
        }
      },
      {
        "id": 28,
        "category": "Derivatives",
        "theme": "emerald",
        "front": {
          "title": "Option Delta"
        },
        "back": {
          "title": "Option Delta Sensitivity",
          "tagline": "Delta measures option price change per asset price change.",
          "summary": "Formula: $$\\Delta = \\frac{\\partial C}{\\partial S}$$",
          "table": {
            "headers": ["Option Type", "Delta Range"],
            "rows": [
              ["Call Option", "$$0 \\le \\Delta \\le 1$$"   ],
              ["Put Option", "$$-1 \\le \\Delta \\le 0$$"  ]
            ]
          }
        }
      },
      {
        "id": 29,
        "category": "Capital Structure",
        "theme": "gold",
        "front": {
          "title": "Modigliani-Miller I"
        },
        "back": {
          "title": "Capital Structure Irrelevance",
          "tagline": "In perfect markets, capital structure does not affect firm value.",
          "summary": "Firm value is determined by its assets and earning power, not financing choice.",
          "key_points": [
            "Assumes zero taxes, transaction costs, or bankruptcy risk.",
            "Formula: $$V_U = V_L$$"
          ]
        }
      }
    ]
  },
  class10_science: {
    name: "Class 10 Science - Chemical Reactions & Equations",
    description: "Important reactions, equations, types of reactions, and balanced equations for CBSE Class 10.",
    cards: [
      {
        "id": 1,
        "category": "Science - Chemistry",
        "theme": "cyan",
        "front": {
          "title": "Reaction Types"
        },
        "back": {
          "title": "Combination vs. Decomposition",
          "tagline": "Opposite chemical pathways representing synthesis and breakdown.",
          "summary": "Combination reactions merge multiple substances into one product, while decomposition reactions break down a single substance into multiple simpler products.",
          "table": {
            "headers": ["Feature", "Combination", "Decomposition"],
            "rows": [
              ["Equation", "A + B → AB", "AB → A + B"],
              ["Energy", "Exothermic", "Endothermic"],
              ["Example", "$$\\text{CaO} + \\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2$$", "$$2\\text{FeSO}_4 \\rightarrow \\text{Fe}_2\\text{O}_3 + \\text{SO}_2 + \\text{SO}_3$$"]
            ]
          },
          "key_points": [
            "Decomposition has 3 sub-types: Thermal, Electrolytic, and Photolytic.",
            "Photolytic: $$2\\text{AgCl} \\xrightarrow{\\text{Sunlight}} 2\\text{Ag} + \\text{Cl}_2$$ [Used in black & white photography]."
          ]
        }
      },
      {
        "id": 2,
        "category": "Science - Chemistry",
        "theme": "cyan",
        "front": {
          "title": "Redox Reactions"
        },
        "back": {
          "title": "Redox (Reduction-Oxidation)",
          "tagline": "Simultaneous electron/oxygen transfer occurring in chemical processes.",
          "summary": "Oxidation is the gain of oxygen or loss of hydrogen. Reduction is the loss of oxygen or gain of hydrogen. They always occur together.",
          "table": {
            "headers": ["Process", "Oxygen Change", "Hydrogen Change"],
            "rows": [
              ["Oxidation", "Gain of Oxygen (+O)", "Loss of Hydrogen (-H)"],
              ["Reduction", "Loss of Oxygen (-O)", "Gain of Hydrogen (+H)"]
            ]
          },
          "key_points": [
            "Mnemonic: **LEO** (Loss of Electrons = Oxidation) goes **GER** (Gain of Electrons = Reduction).",
            "In $$\\text{CuO} + \\text{H}_2 \\rightarrow \\text{Cu} + \\text{H}_2\\text{O}$$: CuO is reduced, $$\\text{H}_2$$ is oxidized."
          ]
        }
      }
    ]
  }
};
