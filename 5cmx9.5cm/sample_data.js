// 27-Ca,
  finance_54: {
    id: "finance_54",
    name: "Finance, Economics & Tech (54 Cards • 2 Sheets)",
    category: "Finance & Strategy",
    theme: "cyan",
    cards: [
      {
        id: 1,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Time Value of Money",
        tagline: "A rupee today is worth more than a rupee tomorrow.",
        summary: "Fundamental principle that money's purchasing power changes over time due to earning capacity, inflation, and risk.",
        key_points: [
          "Compounding: $\\text{FV} = \\text{PV} \\times (1 + r)^n$",
          "Discounting: $\\text{PV} = \\frac{\\text{FV}}{(1 + r)^n}$"
        ],
        mnemonic: "P-V-F: Present + Velocity of interest = Future value"
      },
      {
        id: 2,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Net Present Value",
        tagline: "The gold standard for capital investment decisions.",
        summary: "The sum of all discounted future cash inflows minus initial capital outlay.",
        key_points: [
          "Formula: $\\text{NPV} = \\sum_{t=1}^{T} \\frac{C_t}{(1+r)^t} - C_0$",
          "Decision Rule: Accept project if $\\text{NPV} > 0$"
        ],
        mnemonic: "Positive NPV = Value Created"
      },
      {
        id: 3,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Internal Rate of Return",
        tagline: "Discount rate where net present value equals zero.",
        summary: "The expected annual compound rate of return that an investment will earn.",
        table: {
          headers: ["Condition", "Action"],
          rows: [
            ["IRR > Hurdle Rate", "Accept Project"],
            ["IRR < Hurdle Rate", "Reject Project"]
          ]
        },
        key_points: [
          "Solves: $\\text{NPV} = 0$",
          "Assumes cash flows reinvested at the IRR itself."
        ]
      },
      {
        id: 4,
        category: "Capital Structure",
        theme: "orange",
        title: "WACC",
        tagline: "Weighted Average Cost of Capital across debt and equity.",
        summary: "The blended hurdle rate a firm pays to finance its assets, weighting debt and equity.",
        key_points: [
          "Formula: $\\text{WACC} = \\frac{E}{V}K_e + \\frac{D}{V}K_d(1 - T)$",
          "Tax Shield: Interest on debt is tax-deductible."
        ],
        diagram: "[Debt ($K_d$)] + [Equity ($K_e$)] ──> [WACC]"
      },
      {
        id: 5,
        category: "Capital Structure",
        theme: "orange",
        title: "Modigliani-Miller I",
        tagline: "Capital structure irrelevance in perfect markets.",
        summary: "Firm value is independent of capital structure when there are no taxes, bankruptcy costs, or asymmetric information.",
        key_points: [
          "Theorem: $V_L = V_U$ (without taxes)",
          "With Taxes: $V_L = V_U + (T_c \\times D)$"
        ],
        mnemonic: "MM: Mix of Money doesn't alter Market value"
      },
      {
        id: 6,
        category: "Capital Structure",
        theme: "orange",
        title: "Pecking Order Theory",
        tagline: "Financing hierarchy driven by asymmetric information.",
        summary: "Managers follow a strict financing preference order to minimize adverse selection signaling.",
        diagram: "1. Internal Cash ──> 2. Debt ──> 3. New Equity",
        key_points: [
          "Equity is lowest priority due to dilution signal.",
          "Firms prefer internal cash flow first."
        ]
      },
      {
        id: 7,
        category: "Asset Pricing",
        theme: "purple",
        title: "CAPM",
        tagline: "Capital Asset Pricing Model for required return.",
        summary: "Models the relationship between systematic market risk and expected return for assets.",
        key_points: [
          "Formula: $E(R_i) = R_f + \\beta_i (E(R_m) - R_f)$",
          "Market Risk Premium: $(E(R_m) - R_f)$"
        ],
        mnemonic: "R-F plus Beta times Premium"
      },
      {
        id: 8,
        category: "Asset Pricing",
        theme: "purple",
        title: "Beta (\\beta)",
        tagline: "Measure of systematic, non-diversifiable volatility.",
        summary: "How sensitively an individual asset's price moves relative to the benchmark market index.",
        table: {
          headers: ["Beta Value", "Sensitivity"],
          rows: [
            ["$\\beta > 1.0$", "More volatile than market"],
            ["$\\beta = 1.0$", "Moves identically with market"],
            ["$\\beta < 1.0$", "Defensive / lower volatility"]
          ]
        }
      },
      {
        id: 9,
        category: "Asset Pricing",
        theme: "purple",
        title: "Sharpe Ratio",
        tagline: "Risk-adjusted return per unit of total risk.",
        summary: "Measures excess portfolio return per unit of standard deviation.",
        key_points: [
          "Formula: $S_p = \\frac{R_p - R_f}{\\sigma_p}$",
          "Higher Sharpe ratio indicates superior risk efficiency."
        ],
        mnemonic: "Sharpe = Excess Return / Total Volatility"
      },
      {
        id: 10,
        category: "Equity Valuation",
        theme: "emerald",
        title: "Gordon Growth Model",
        tagline: "Constant-growth dividend discount model.",
        summary: "Values a stock by discounting perpetual dividends growing at a steady compound rate.",
        key_points: [
          "Formula: $P_0 = \\frac{D_1}{r - g} = \\frac{D_0(1+g)}{r - g}$",
          "Condition: Required rate $r$ must exceed growth rate $g$."
        ]
      },
      {
        id: 11,
        category: "Equity Valuation",
        theme: "emerald",
        title: "Free Cash Flow to Firm",
        tagline: "Cash generated available to all capital providers.",
        summary: "Operating cash left after covering operating expenses and capital investments.",
        key_points: [
          "Formula: $\\text{FCFF} = \\text{EBIT}(1 - T) + \\text{D\\&A} - \\text{CapEx} - \\Delta\\text{NWC}$",
          "Discounted at WACC to determine total Enterprise Value."
        ]
      },
      {
        id: 12,
        category: "Equity Valuation",
        theme: "emerald",
        title: "P/E vs EV/EBITDA",
        tagline: "Equity multiple vs Enterprise multiple comparison.",
        summary: "P/E is influenced by capital structure; EV/EBITDA provides a debt-neutral cross-firm comparison.",
        table: {
          headers: ["Metric", "Capital Structure Neutral?"],
          rows: [
            ["P/E Ratio", "No (impacted by debt interest)"],
            ["EV/EBITDA", "Yes (before interest & taxes)"]
          ]
        }
      },
      {
        id: 13,
        category: "Working Capital",
        theme: "gold",
        title: "Cash Conversion Cycle",
        tagline: "Days required to turn cash outlay back into cash collected.",
        summary: "Measures operational liquidity and efficiency in managing inventory, receivables, and payables.",
        key_points: [
          "Formula: $\\text{CCC} = \\text{DIO} + \\text{DSO} - \\text{DPO}$",
          "DIO: Days Inventory, DSO: Receivables, DPO: Payables"
        ],
        mnemonic: "Inbound Days + Sale Days - Supplier Days"
      },
      {
        id: 14,
        category: "Working Capital",
        theme: "gold",
        title: "Current & Quick Ratio",
        tagline: "Short-term solvency and acid-test liquidity.",
        summary: "Current ratio measures total short-term coverage; Quick ratio excludes less liquid inventory.",
        key_points: [
          "Current: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$ (Benchmark ~ 2:1)",
          "Quick: $\\frac{\\text{Cash + Marketable Sec + Receivables}}{\\text{Current Liabilities}}$"
        ]
      },
      {
        id: 15,
        category: "Working Capital",
        theme: "gold",
        title: "DuPont Analysis",
        tagline: "Decomposing Return on Equity into 3 core drivers.",
        summary: "Dissects ROE into operational profitability, asset efficiency, and financial leverage.",
        key_points: [
          "$\\text{ROE} = \\text{Net Margin} \\times \\text{Asset Turnover} \\times \\text{Equity Multiplier}$",
          "$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Sales}} \\times \\frac{\\text{Sales}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}$"
        ]
      },
      {
        id: 16,
        category: "Fixed Income",
        theme: "cyan",
        title: "Bond Yield to Maturity",
        tagline: "Total anticipated return if held until maturity date.",
        summary: "Internal rate of return equating the present value of coupon payments and face value to bond price.",
        key_points: [
          "Price & Yield move inversely: $P \\uparrow \\implies Y \\downarrow$",
          "At Par: $\\text{Coupon Rate} = \\text{Current Yield} = \\text{YTM}$"
        ],
        mnemonic: "See-saw: Price goes Up, Yield goes Down"
      },
      {
        id: 17,
        category: "Fixed Income",
        theme: "cyan",
        title: "Macaulay Duration",
        tagline: "Weighted average time to receive all cash flows.",
        summary: "Measures a bond's price sensitivity to interest rate fluctuations.",
        key_points: [
          "Modified Duration: $D^* = \\frac{D_{\\text{Mac}}}{1 + y/k}$",
          "Price Change: $\\%\\Delta P \\approx -D^* \\times \\Delta y$"
        ]
      },
      {
        id: 18,
        category: "Fixed Income",
        theme: "cyan",
        title: "Bond Convexity",
        tagline: "Curvature correction for duration price estimates.",
        summary: "Captures how duration changes as market yields fluctuate. Higher convexity is always beneficial to bondholders.",
        key_points: [
          "Convexity is positive for vanilla non-callable bonds.",
          "Reduces price drops when yields rise; enhances gains."
        ],
        diagram: "Price/Yield Curve: Duration (tangent) vs True Curve"
      },
      {
        id: 19,
        category: "Derivatives",
        theme: "orange",
        title: "Put-Call Parity",
        tagline: "No-arbitrage relationship between European options.",
        summary: "Links European call, European put, underlying stock price, and present value of strike price.",
        key_points: [
          "Formula: $C + K e^{-rT} = P + S_0$",
          "Synthetics: Long Stock + Long Put = Protective Put"
        ],
        mnemonic: "Call + Cash = Put + Stock"
      },
      {
        id: 20,
        category: "Derivatives",
        theme: "orange",
        title: "Option Greeks",
        tagline: "Risk sensitivities of option contracts.",
        summary: "Key metrics measuring exposure to price, volatility, and time decay.",
        table: {
          headers: ["Greek", "Measures Sensitivity To"],
          rows: [
            ["Delta ($\\Delta$)", "Underlying stock price"],
            ["Gamma ($\\Gamma$)", "Rate of change of Delta"],
            ["Theta ($\\Theta$)", "Time decay (per day loss)"],
            ["Vega ($\\nu$)", "Implied volatility changes"]
          ]
        }
      },
      {
        id: 21,
        category: "Derivatives",
        theme: "orange",
        title: "Black-Scholes Model",
        tagline: "Continuous-time analytical option pricing formula.",
        summary: "Prices European options assuming lognormal stock prices, constant risk-free rate, and constant volatility.",
        key_points: [
          "$C = S_0 N(d_1) - K e^{-rT} N(d_2)$",
          "$N(d_2)$ represents risk-neutral probability of expiring in-the-money."
        ]
      },
      {
        id: 22,
        category: "Economics",
        theme: "purple",
        title: "Purchasing Power Parity",
        tagline: "Exchange rate equilibrium based on price levels.",
        summary: "Exchange rates adjust to equalize purchasing power of identical baskets of goods across nations.",
        key_points: [
          "Relative PPP: $\\%\\Delta S = \\pi_{\\text{domestic}} - \\pi_{\\text{foreign}}$",
          "Big Mac Index is a famous simplified test of PPP."
        ]
      },
      {
        id: 23,
        category: "Economics",
        theme: "purple",
        title: "Interest Rate Parity",
        tagline: "Forward premium offsets interest rate differentials.",
        summary: "No-arbitrage condition stating forward exchange rate equals spot rate adjusted for interest rate spreads.",
        key_points: [
          "Covered IRP: $\\frac{F}{S} = \\frac{1 + r_d}{1 + r_f}$",
          "Prevents riskless covered interest arbitrage."
        ]
      },
      {
        id: 24,
        category: "Portfolio Theory",
        theme: "emerald",
        title: "Efficient Frontier",
        tagline: "Optimal portfolios maximizing return for given risk.",
        summary: "Set of optimal portfolios that offer the highest expected return for a defined level of risk ($\\sigma$).",
        key_points: [
          "Markowitz Mean-Variance optimization.",
          "Combining risky assets with risk-free rate yields the Capital Allocation Line (CAL)."
        ],
        diagram: "[Risk $\\sigma$] vs [Return $E(R)$] ──> Efficient Curve"
      },
      {
        id: 25,
        category: "Portfolio Theory",
        theme: "emerald",
        title: "Diversification Rule",
        tagline: "Eliminating unsystematic risk without sacrificing return.",
        summary: "Combining uncorrelated assets reduces portfolio variance ($\\sigma_p^2$) while preserving weighted expected returns.",
        key_points: [
          "Firm-specific risk diminishes as $N \\to 30+$ stocks.",
          "Systematic market risk cannot be diversified away."
        ],
        mnemonic: "Don't put all your eggs in one basket"
      },
      {
        id: 26,
        category: "Mergers & Acq",
        theme: "gold",
        title: "Accretion / Dilution",
        tagline: "Immediate post-merger impact on earnings per share.",
        summary: "An acquisition is accretive if combined pro-forma EPS exceeds the acquirer's standalone EPS.",
        table: {
          headers: ["Deal Type", "Condition for Accretion"],
          rows: [
            ["All-Stock Deal", "Acquirer P/E > Target P/E"],
            ["All-Cash Deal", "Target E/P > After-tax Cash Cost"]
          ]
        }
      },
      {
        id: 27,
        category: "Mergers & Acq",
        theme: "gold",
        title: "Enterprise Value Formula",
        tagline: "Total theoretical purchase price of an entire firm.",
        summary: "Represents the total value of operating assets, reflecting claims by both equity and debt holders.",
        key_points: [
          "$\\text{EV} = \\text{Market Cap} + \\text{Total Debt} - \\text{Cash} + \\text{Preferred} + \\text{Minority}$",
          "Cash is subtracted because acquirer pockets firm cash."
        ],
        mnemonic: "EV = Equity + Debt - Cash"
      }
,
      {
        id: 28,
        category: "Macroeconomics",
        theme: "emerald",
        title: "GDP & Real vs Nominal",
        tagline: "Total economic output adjusted for inflation.",
        summary: "Gross Domestic Product measures total value of goods/services. Real GDP removes price inflation to measure actual production growth.",
        key_points: ["$\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100$", "Expands during recoveries; contracts during recessions."],
        mnemonic: "R-N-D: Real removes price Noise from Deflator"
      },
      {
        id: 29,
        category: "Macroeconomics",
        theme: "purple",
        title: "Inflation & CPI",
        tagline: "Erosion of purchasing power over time.",
        summary: "Consumer Price Index measures average change over time in prices paid by urban consumers for a fixed basket of goods.",
        key_points: ["Demand-pull: Aggregate demand outpaces supply.", "Cost-push: Rising input costs push final prices up."],
        mnemonic: "CPI: Constant Price Inflation basket"
      },
      {
        id: 30,
        category: "Corporate Finance",
        theme: "orange",
        title: "Free Cash Flow to Firm (FCFF)",
        tagline: "Unlevered cash available to all capital providers.",
        summary: "Operating cash flow generated by core business after working capital and capex, before debt repayments.",
        key_points: ["$\\text{FCFF} = \\text{EBIT}(1 - t) + \\text{D&A} - \\Delta\\text{WC} - \\text{CapEx}$", "Discounted at WACC to calculate Enterprise Value."],
        mnemonic: "F-C-F-F: Firm Cash Flows Free of leverage"
      },
      {
        id: 31,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Free Cash Flow to Equity (FCFE)",
        tagline: "Cash flow available specifically to equity holders.",
        summary: "Net cash generated after operating expenses, capex, debt service, and net debt issuances.",
        key_points: ["$\\text{FCFE} = \\text{FCFF} - \\text{Interest}(1 - t) + \\text{Net Borrowing}$", "Discounted at Cost of Equity ($K_e$) to yield Equity Value."],
        mnemonic: "FCFE = Equity's net residual harvest"
      },
      {
        id: 32,
        category: "Valuation",
        theme: "gold",
        title: "Comparable Company Analysis",
        tagline: "Relative peer valuation using trading multiples.",
        summary: "Values a business based on market metrics of comparable publicly traded peers in same sector.",
        key_points: ["EV Multiples: EV/EBITDA, EV/Sales, EV/EBIT", "Equity Multiples: P/E, Price/Book, PEG ratio."],
        mnemonic: "Comps: Benchmark against identical peers"
      },
      {
        id: 33,
        category: "Valuation",
        theme: "rose",
        title: "Precedent Transactions",
        tagline: "M&A historical transaction multiple valuation.",
        summary: "Values a firm based on actual prices paid for similar companies in past mergers and acquisitions.",
        key_points: ["Includes control premium paid by strategic buyers (typically 15-30%).", "Reflects transaction environment and synergies."],
        mnemonic: "Precedents include Buyer's Premium"
      },
      {
        id: 34,
        category: "Corporate Strategy",
        theme: "blue",
        title: "Porter's 5 Forces",
        tagline: "Framework for industry competitiveness and profitability.",
        summary: "Analyzes the five competitive forces that shape industry structure and long-term profit potential.",
        key_points: ["1. Supplier Power &nbsp; 2. Buyer Power", "3. Competitive Rivalry &nbsp; 4. Threat of Substitutes &nbsp; 5. Threat of New Entrants"],
        mnemonic: "S-B-R-S-E: Suppliers, Buyers, Rivalry, Subs, Entrants"
      },
      {
        id: 35,
        category: "Corporate Finance",
        theme: "violet",
        title: "Gordon Growth Model",
        tagline: "Perpetual dividend discount valuation model.",
        summary: "Values a stock by assuming dividends grow at a constant stable rate forever.",
        key_points: ["Formula: $P_0 = \\frac{D_1}{r - g} = \\frac{D_0(1+g)}{r - g}$", "Requires $r > g$; sensitive to small changes in $g$."],
        mnemonic: "G-G-M: Dividend 1 over ($r$ minus $g$)"
      },
      {
        id: 36,
        category: "Quantitative Finance",
        theme: "teal",
        title: "Sharpe Ratio",
        tagline: "Measure of risk-adjusted excess investment return.",
        summary: "Evaluates how well an asset compensates an investor for the risk taken relative to a risk-free benchmark.",
        key_points: ["Formula: $S = \\frac{R_p - R_f}{\\sigma_p}$", "Higher Sharpe indicates superior risk-adjusted reward."],
        mnemonic: "Sharpe: Excess return per unit of volatility"
      },
      {
        id: 37,
        category: "Quantitative Finance",
        theme: "emerald",
        title: "Capital Asset Pricing Model (CAPM)",
        tagline: "Relationship between systematic risk and expected return.",
        summary: "Calculates required cost of equity based on asset's sensitivity to broad market movements (Beta).",
        key_points: ["Formula: $E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$", "Alpha ($\\\\alpha$) measures return generated above CAPM."],
        mnemonic: "CAPM: Risk-free plus Beta times Market Premium"
      },
      {
        id: 38,
        category: "Accounting",
        theme: "orange",
        title: "DuPont 3-Step ROE Analysis",
        tagline: "Decomposing Return on Equity into operational drivers.",
        summary: "Breaks ROE into Profit Margin, Asset Turnover, and Financial Leverage to identify sources of return.",
        key_points: ["$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Sales}} \\times \\frac{\\text{Sales}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}$", "Profitability $\\times$ Efficiency $\\times$ Leverage."],
        mnemonic: "P-E-L: Profit margin, Efficiency, Leverage"
      },
      {
        id: 39,
        category: "M&A Finance",
        theme: "purple",
        title: "Accretion / Dilution Analysis",
        tagline: "Impact of merger/acquisition on Buyer's EPS.",
        summary: "Evaluates whether buyer's pro-forma earnings per share increase (accretive) or decrease (dilutive) post-deal.",
        key_points: ["Accretive: Acquirer P/E > Target P/E (in 100% stock deal).", "Dilutive: Post-deal EPS falls below standalone EPS."],
        mnemonic: "Accretive adds EPS; Dilutive destroys EPS"
      },
      {
        id: 40,
        category: "Risk Management",
        theme: "cyan",
        title: "Value at Risk (VaR)",
        tagline: "Maximum expected financial loss over a given timeframe.",
        summary: "Quantifies the threshold dollar loss that will not be exceeded at a specified confidence level.",
        key_points: ["Example: 1-day 95% VaR of $1M means 95% confidence loss won't exceed $1M.", "Parametric, Historical, and Monte Carlo methods."],
        mnemonic: "VaR: Worst expected loss at $X\\%$ confidence"
      },
      {
        id: 41,
        category: "Fixed Income",
        theme: "gold",
        title: "Bond Duration & Convexity",
        tagline: "Sensitivity of bond prices to interest rate changes.",
        summary: "Macaulay/Modified duration measures price volatility per 1% change in yield. Convexity accounts for curvature.",
        key_points: ["$\\frac{\\Delta P}{P} \\approx -D^* \\cdot \\Delta y + \\frac{1}{2} C (\\Delta y)^2$", "Higher coupon & shorter maturity reduce duration."],
        mnemonic: "Duration = Linear price risk; Convexity = Curvature"
      },
      {
        id: 42,
        category: "Fixed Income",
        theme: "rose",
        title: "Yield Curve Dynamics",
        tagline: "Graphical representation of yields across maturities.",
        summary: "Normal curve slopes upward. Inverted curve (short rates > long rates) historically predicts economic recession.",
        key_points: ["Normal: Upward sloping (term premium for liquidity).", "Inverted: 2y/10y spread turns negative before recessions."],
        mnemonic: "Inversion = Impending Recession signal"
      },
      {
        id: 43,
        category: "Corporate Finance",
        theme: "blue",
        title: "Working Capital Optimization",
        tagline: "Cash Conversion Cycle (CCC) efficiency.",
        summary: "Days taken to convert inventory and resources into cash inflows from customers.",
        key_points: ["$\\text{CCC} = \\text{DIO} + \\text{DSO} - \\text{DPO}$", "Lower or negative CCC means company self-funds growth."],
        mnemonic: "Inventory Days + Sales Days - Payable Days"
      },
      {
        id: 44,
        category: "Derivatives",
        theme: "violet",
        title: "Black-Scholes-Merton Model",
        tagline: "Mathematical formula for pricing European stock options.",
        summary: "Prices options based on stock price, strike, volatility, risk-free rate, and time to expiration.",
        key_points: ["Call: $C = S_0 N(d_1) - K e^{-rT} N(d_2)$", "Assumes log-normal asset prices and constant volatility."],
        mnemonic: "5 Inputs: S, K, T, r, $\\\\sigma$"
      },
      {
        id: 45,
        category: "Derivatives",
        theme: "teal",
        title: "The Option Greeks",
        tagline: "Measures of option price sensitivity to market variables.",
        summary: "Quantifies the risk exposures of an options portfolio across different dimensions.",
        key_points: ["Delta: $\\frac{\\partial V}{\\partial S}$ &nbsp; Gamma: $\\frac{\\partial^2 V}{\\partial S^2}$", "Theta: Time decay &nbsp; Vega: Volatility sensitivity &nbsp; Rho: Interest rate"],
        mnemonic: "D-G-T-V-R: Delta, Gamma, Theta, Vega, Rho"
      },
      {
        id: 46,
        category: "Venture Capital",
        theme: "emerald",
        title: "Pre-Money vs Post-Money",
        tagline: "Startup valuation mechanics across funding rounds.",
        summary: "Pre-money is company value before new investment; post-money is pre-money plus cash invested.",
        key_points: ["$\\text{Post-Money} = \\text{Pre-Money} + \\text{Investment}$", "Investor Ownership $\\% = \\frac{\\text{Investment}}{\\text{Post-Money}}$"],
        mnemonic: "Post = Pre + Cash; Ownership = Cash / Post"
      },
      {
        id: 47,
        category: "Computer Science",
        theme: "orange",
        title: "Big-O Algorithmic Complexity",
        tagline: "Asymptotic upper bound of runtime and space scaling.",
        summary: "Classifies algorithms according to how their run time or space requirements grow as the input size $N$ grows.",
        key_points: ["$O(1) < O(\\log N) < O(N) < O(N \\log N) < O(N^2) < O(2^N)$", "QuickSort: $O(N \\log N)$ avg; Hash Map lookup: $O(1)$ avg."],
        mnemonic: "Constant, Log, Linear, Linearithmic, Quadratic"
      },
      {
        id: 48,
        category: "Computer Science",
        theme: "purple",
        title: "ACID Database Properties",
        tagline: "Guarantees that database transactions are processed reliably.",
        summary: "Four fundamental properties required for robust database transactions in relational systems.",
        key_points: ["Atomicity: All or nothing execution.", "Consistency: Valid state transitions.", "Isolation: Concurrent execution without interference.", "Durability: Committed data survives crashes."],
        mnemonic: "A-C-I-D: Atomicity, Consistency, Isolation, Durability"
      },
      {
        id: 49,
        category: "Artificial Intelligence",
        theme: "cyan",
        title: "Transformer Attention Mechanism",
        tagline: "Scaled Dot-Product Attention in modern LLMs.",
        summary: "Calculates dynamic contextual relevance between all tokens in a sequence simultaneously.",
        key_points: ["$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$", "Replaced sequential RNNs with parallelizable matrix math."],
        mnemonic: "Q-K-V: Query matches Key to weight Values"
      },
      {
        id: 50,
        category: "Artificial Intelligence",
        theme: "gold",
        title: "Bias-Variance Tradeoff",
        tagline: "The fundamental dilemma in predictive statistical models.",
        summary: "High bias underfits the data (oversimplified); high variance overfits the training noise (fails on test data).",
        key_points: ["Total Error = $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error}$", "Regularization (L1/L2, Dropout) mitigates variance."],
        mnemonic: "Bias = Underfit; Variance = Overfit"
      },
      {
        id: 51,
        category: "Economics",
        theme: "rose",
        title: "Game Theory: Nash Equilibrium",
        tagline: "Optimal state where no player has incentive to unilaterally deviate.",
        summary: "A situation where each player chooses their best response given the strategies chosen by all other players.",
        key_points: ["Prisoner's Dilemma: Defect is dominant strategy leading to Pareto sub-optimal outcome.", "Applied in pricing wars, bidding, and geopolitics."],
        mnemonic: "Nash: No incentive to change strategy alone"
      },
      {
        id: 52,
        category: "Economics",
        theme: "blue",
        title: "Price Elasticity of Demand",
        tagline: "Sensitivity of quantity demanded to changes in price.",
        summary: "Percentage change in quantity demanded in response to a percentage change in price.",
        key_points: ["$\\epsilon_d = \\frac{\\% \\Delta Q}{\\% \\Delta P}$", "$|\\epsilon| > 1$: Elastic; $|\\epsilon| < 1$: Inelastic (essential goods)."],
        mnemonic: "Elastic = Price sensitive; Inelastic = Essential"
      },
      {
        id: 53,
        category: "Corporate Strategy",
        theme: "violet",
        title: "Network Effects & Moats",
        tagline: "Value increases exponentially as more users join the platform.",
        summary: "Metcalfe's Law states value scales with $N^2$. Direct and two-sided network effects create durable economic moats.",
        key_points: ["Direct: Communication networks (WhatsApp, phone).", "Two-Sided: Marketplaces (Uber, Airbnb, App Store)."],
        mnemonic: "Network Moat: More users attract more users"
      },
      {
        id: 54,
        category: "Decision Science",
        theme: "teal",
        title: "Expected Value & Decision Trees",
        tagline: "Probability-weighted average of all possible future outcomes.",
        summary: "Calculates optimal strategic pathways by weighting payout scenarios against their probabilities.",
        key_points: ["$\\text{EV} = \\sum_{i=1}^{k} P(x_i) \\times V(x_i)$", "Guides capital allocation, poker, and risk management."],
        mnemonic: "EV: Probability times Payout across all branches"
      }
    ]
  }
rd Sample Packs for 5cm x 9.5cm Single-Sided Sheet Format (27 Cards per A3 / 12x18)
const SAMPLE_PACKS = {
  finance_27: {
    id: "finance_27",
    name: "Corporate Finance & Valuation (27 Cards)",
    category: "Corporate Finance",
    theme: "cyan",
    cards: [
      {
        id: 1,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Time Value of Money",
        tagline: "A rupee today is worth more than a rupee tomorrow.",
        summary: "Fundamental principle that money's purchasing power changes over time due to earning capacity, inflation, and risk.",
        key_points: [
          "Compounding: $\\text{FV} = \\text{PV} \\times (1 + r)^n$",
          "Discounting: $\\text{PV} = \\frac{\\text{FV}}{(1 + r)^n}$"
        ],
        mnemonic: "P-V-F: Present + Velocity of interest = Future value"
      },
      {
        id: 2,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Net Present Value",
        tagline: "The gold standard for capital investment decisions.",
        summary: "The sum of all discounted future cash inflows minus initial capital outlay.",
        key_points: [
          "Formula: $\\text{NPV} = \\sum_{t=1}^{T} \\frac{C_t}{(1+r)^t} - C_0$",
          "Decision Rule: Accept project if $\\text{NPV} > 0$"
        ],
        mnemonic: "Positive NPV = Value Created"
      },
      {
        id: 3,
        category: "Corporate Finance",
        theme: "cyan",
        title: "Internal Rate of Return",
        tagline: "Discount rate where net present value equals zero.",
        summary: "The expected annual compound rate of return that an investment will earn.",
        table: {
          headers: ["Condition", "Action"],
          rows: [
            ["IRR > Hurdle Rate", "Accept Project"],
            ["IRR < Hurdle Rate", "Reject Project"]
          ]
        },
        key_points: [
          "Solves: $\\text{NPV} = 0$",
          "Assumes cash flows reinvested at the IRR itself."
        ]
      },
      {
        id: 4,
        category: "Capital Structure",
        theme: "orange",
        title: "WACC",
        tagline: "Weighted Average Cost of Capital across debt and equity.",
        summary: "The blended hurdle rate a firm pays to finance its assets, weighting debt and equity.",
        key_points: [
          "Formula: $\\text{WACC} = \\frac{E}{V}K_e + \\frac{D}{V}K_d(1 - T)$",
          "Tax Shield: Interest on debt is tax-deductible."
        ],
        diagram: "[Debt ($K_d$)] + [Equity ($K_e$)] ──> [WACC]"
      },
      {
        id: 5,
        category: "Capital Structure",
        theme: "orange",
        title: "Modigliani-Miller I",
        tagline: "Capital structure irrelevance in perfect markets.",
        summary: "Firm value is independent of capital structure when there are no taxes, bankruptcy costs, or asymmetric information.",
        key_points: [
          "Theorem: $V_L = V_U$ (without taxes)",
          "With Taxes: $V_L = V_U + (T_c \\times D)$"
        ],
        mnemonic: "MM: Mix of Money doesn't alter Market value"
      },
      {
        id: 6,
        category: "Capital Structure",
        theme: "orange",
        title: "Pecking Order Theory",
        tagline: "Financing hierarchy driven by asymmetric information.",
        summary: "Managers follow a strict financing preference order to minimize adverse selection signaling.",
        diagram: "1. Internal Cash ──> 2. Debt ──> 3. New Equity",
        key_points: [
          "Equity is lowest priority due to dilution signal.",
          "Firms prefer internal cash flow first."
        ]
      },
      {
        id: 7,
        category: "Asset Pricing",
        theme: "purple",
        title: "CAPM",
        tagline: "Capital Asset Pricing Model for required return.",
        summary: "Models the relationship between systematic market risk and expected return for assets.",
        key_points: [
          "Formula: $E(R_i) = R_f + \\beta_i (E(R_m) - R_f)$",
          "Market Risk Premium: $(E(R_m) - R_f)$"
        ],
        mnemonic: "R-F plus Beta times Premium"
      },
      {
        id: 8,
        category: "Asset Pricing",
        theme: "purple",
        title: "Beta (\\beta)",
        tagline: "Measure of systematic, non-diversifiable volatility.",
        summary: "How sensitively an individual asset's price moves relative to the benchmark market index.",
        table: {
          headers: ["Beta Value", "Sensitivity"],
          rows: [
            ["$\\beta > 1.0$", "More volatile than market"],
            ["$\\beta = 1.0$", "Moves identically with market"],
            ["$\\beta < 1.0$", "Defensive / lower volatility"]
          ]
        }
      },
      {
        id: 9,
        category: "Asset Pricing",
        theme: "purple",
        title: "Sharpe Ratio",
        tagline: "Risk-adjusted return per unit of total risk.",
        summary: "Measures excess portfolio return per unit of standard deviation.",
        key_points: [
          "Formula: $S_p = \\frac{R_p - R_f}{\\sigma_p}$",
          "Higher Sharpe ratio indicates superior risk efficiency."
        ],
        mnemonic: "Sharpe = Excess Return / Total Volatility"
      },
      {
        id: 10,
        category: "Equity Valuation",
        theme: "emerald",
        title: "Gordon Growth Model",
        tagline: "Constant-growth dividend discount model.",
        summary: "Values a stock by discounting perpetual dividends growing at a steady compound rate.",
        key_points: [
          "Formula: $P_0 = \\frac{D_1}{r - g} = \\frac{D_0(1+g)}{r - g}$",
          "Condition: Required rate $r$ must exceed growth rate $g$."
        ]
      },
      {
        id: 11,
        category: "Equity Valuation",
        theme: "emerald",
        title: "Free Cash Flow to Firm",
        tagline: "Cash generated available to all capital providers.",
        summary: "Operating cash left after covering operating expenses and capital investments.",
        key_points: [
          "Formula: $\\text{FCFF} = \\text{EBIT}(1 - T) + \\text{D\\&A} - \\text{CapEx} - \\Delta\\text{NWC}$",
          "Discounted at WACC to determine total Enterprise Value."
        ]
      },
      {
        id: 12,
        category: "Equity Valuation",
        theme: "emerald",
        title: "P/E vs EV/EBITDA",
        tagline: "Equity multiple vs Enterprise multiple comparison.",
        summary: "P/E is influenced by capital structure; EV/EBITDA provides a debt-neutral cross-firm comparison.",
        table: {
          headers: ["Metric", "Capital Structure Neutral?"],
          rows: [
            ["P/E Ratio", "No (impacted by debt interest)"],
            ["EV/EBITDA", "Yes (before interest & taxes)"]
          ]
        }
      },
      {
        id: 13,
        category: "Working Capital",
        theme: "gold",
        title: "Cash Conversion Cycle",
        tagline: "Days required to turn cash outlay back into cash collected.",
        summary: "Measures operational liquidity and efficiency in managing inventory, receivables, and payables.",
        key_points: [
          "Formula: $\\text{CCC} = \\text{DIO} + \\text{DSO} - \\text{DPO}$",
          "DIO: Days Inventory, DSO: Receivables, DPO: Payables"
        ],
        mnemonic: "Inbound Days + Sale Days - Supplier Days"
      },
      {
        id: 14,
        category: "Working Capital",
        theme: "gold",
        title: "Current & Quick Ratio",
        tagline: "Short-term solvency and acid-test liquidity.",
        summary: "Current ratio measures total short-term coverage; Quick ratio excludes less liquid inventory.",
        key_points: [
          "Current: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$ (Benchmark ~ 2:1)",
          "Quick: $\\frac{\\text{Cash + Marketable Sec + Receivables}}{\\text{Current Liabilities}}$"
        ]
      },
      {
        id: 15,
        category: "Working Capital",
        theme: "gold",
        title: "DuPont Analysis",
        tagline: "Decomposing Return on Equity into 3 core drivers.",
        summary: "Dissects ROE into operational profitability, asset efficiency, and financial leverage.",
        key_points: [
          "$\\text{ROE} = \\text{Net Margin} \\times \\text{Asset Turnover} \\times \\text{Equity Multiplier}$",
          "$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Sales}} \\times \\frac{\\text{Sales}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}$"
        ]
      },
      {
        id: 16,
        category: "Fixed Income",
        theme: "cyan",
        title: "Bond Yield to Maturity",
        tagline: "Total anticipated return if held until maturity date.",
        summary: "Internal rate of return equating the present value of coupon payments and face value to bond price.",
        key_points: [
          "Price & Yield move inversely: $P \\uparrow \\implies Y \\downarrow$",
          "At Par: $\\text{Coupon Rate} = \\text{Current Yield} = \\text{YTM}$"
        ],
        mnemonic: "See-saw: Price goes Up, Yield goes Down"
      },
      {
        id: 17,
        category: "Fixed Income",
        theme: "cyan",
        title: "Macaulay Duration",
        tagline: "Weighted average time to receive all cash flows.",
        summary: "Measures a bond's price sensitivity to interest rate fluctuations.",
        key_points: [
          "Modified Duration: $D^* = \\frac{D_{\\text{Mac}}}{1 + y/k}$",
          "Price Change: $\\%\\Delta P \\approx -D^* \\times \\Delta y$"
        ]
      },
      {
        id: 18,
        category: "Fixed Income",
        theme: "cyan",
        title: "Bond Convexity",
        tagline: "Curvature correction for duration price estimates.",
        summary: "Captures how duration changes as market yields fluctuate. Higher convexity is always beneficial to bondholders.",
        key_points: [
          "Convexity is positive for vanilla non-callable bonds.",
          "Reduces price drops when yields rise; enhances gains."
        ],
        diagram: "Price/Yield Curve: Duration (tangent) vs True Curve"
      },
      {
        id: 19,
        category: "Derivatives",
        theme: "orange",
        title: "Put-Call Parity",
        tagline: "No-arbitrage relationship between European options.",
        summary: "Links European call, European put, underlying stock price, and present value of strike price.",
        key_points: [
          "Formula: $C + K e^{-rT} = P + S_0$",
          "Synthetics: Long Stock + Long Put = Protective Put"
        ],
        mnemonic: "Call + Cash = Put + Stock"
      },
      {
        id: 20,
        category: "Derivatives",
        theme: "orange",
        title: "Option Greeks",
        tagline: "Risk sensitivities of option contracts.",
        summary: "Key metrics measuring exposure to price, volatility, and time decay.",
        table: {
          headers: ["Greek", "Measures Sensitivity To"],
          rows: [
            ["Delta ($\\Delta$)", "Underlying stock price"],
            ["Gamma ($\\Gamma$)", "Rate of change of Delta"],
            ["Theta ($\\Theta$)", "Time decay (per day loss)"],
            ["Vega ($\\nu$)", "Implied volatility changes"]
          ]
        }
      },
      {
        id: 21,
        category: "Derivatives",
        theme: "orange",
        title: "Black-Scholes Model",
        tagline: "Continuous-time analytical option pricing formula.",
        summary: "Prices European options assuming lognormal stock prices, constant risk-free rate, and constant volatility.",
        key_points: [
          "$C = S_0 N(d_1) - K e^{-rT} N(d_2)$",
          "$N(d_2)$ represents risk-neutral probability of expiring in-the-money."
        ]
      },
      {
        id: 22,
        category: "Economics",
        theme: "purple",
        title: "Purchasing Power Parity",
        tagline: "Exchange rate equilibrium based on price levels.",
        summary: "Exchange rates adjust to equalize purchasing power of identical baskets of goods across nations.",
        key_points: [
          "Relative PPP: $\\%\\Delta S = \\pi_{\\text{domestic}} - \\pi_{\\text{foreign}}$",
          "Big Mac Index is a famous simplified test of PPP."
        ]
      },
      {
        id: 23,
        category: "Economics",
        theme: "purple",
        title: "Interest Rate Parity",
        tagline: "Forward premium offsets interest rate differentials.",
        summary: "No-arbitrage condition stating forward exchange rate equals spot rate adjusted for interest rate spreads.",
        key_points: [
          "Covered IRP: $\\frac{F}{S} = \\frac{1 + r_d}{1 + r_f}$",
          "Prevents riskless covered interest arbitrage."
        ]
      },
      {
        id: 24,
        category: "Portfolio Theory",
        theme: "emerald",
        title: "Efficient Frontier",
        tagline: "Optimal portfolios maximizing return for given risk.",
        summary: "Set of optimal portfolios that offer the highest expected return for a defined level of risk ($\\sigma$).",
        key_points: [
          "Markowitz Mean-Variance optimization.",
          "Combining risky assets with risk-free rate yields the Capital Allocation Line (CAL)."
        ],
        diagram: "[Risk $\\sigma$] vs [Return $E(R)$] ──> Efficient Curve"
      },
      {
        id: 25,
        category: "Portfolio Theory",
        theme: "emerald",
        title: "Diversification Rule",
        tagline: "Eliminating unsystematic risk without sacrificing return.",
        summary: "Combining uncorrelated assets reduces portfolio variance ($\\sigma_p^2$) while preserving weighted expected returns.",
        key_points: [
          "Firm-specific risk diminishes as $N \\to 30+$ stocks.",
          "Systematic market risk cannot be diversified away."
        ],
        mnemonic: "Don't put all your eggs in one basket"
      },
      {
        id: 26,
        category: "Mergers & Acq",
        theme: "gold",
        title: "Accretion / Dilution",
        tagline: "Immediate post-merger impact on earnings per share.",
        summary: "An acquisition is accretive if combined pro-forma EPS exceeds the acquirer's standalone EPS.",
        table: {
          headers: ["Deal Type", "Condition for Accretion"],
          rows: [
            ["All-Stock Deal", "Acquirer P/E > Target P/E"],
            ["All-Cash Deal", "Target E/P > After-tax Cash Cost"]
          ]
        }
      },
      {
        id: 27,
        category: "Mergers & Acq",
        theme: "gold",
        title: "Enterprise Value Formula",
        tagline: "Total theoretical purchase price of an entire firm.",
        summary: "Represents the total value of operating assets, reflecting claims by both equity and debt holders.",
        key_points: [
          "$\\text{EV} = \\text{Market Cap} + \\text{Total Debt} - \\text{Cash} + \\text{Preferred} + \\text{Minority}$",
          "Cash is subtracted because acquirer pockets firm cash."
        ],
        mnemonic: "EV = Equity + Debt - Cash"
      }
    ]
  },
  shayari_quotes_27: {
    id: "shayari_quotes_27",
    name: "Quotes & Shayari (27 Cards)",
    category: "Quotes & Shayari",
    theme: "purple",
    cards: [
      {
        id: 1,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Mirza Ghalib",
        tagline: "Diwan-e-Ghalib",
        quote: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\nबहुत निकले मिरे अरमान लेकिन फिर भी कम निकले",
        author: "मिर्ज़ा ग़ालिब",
        summary: "Human desires are endless; no matter how many are fulfilled, countless more remain."
      },
      {
        id: 2,
        category: "Philosophy",
        theme: "cyan",
        title: "Rumi",
        tagline: "Mystic Wisdom",
        quote: "The wound is the place where the Light enters you.",
        author: "Jalal al-Din Rumi",
        summary: "Suffering and adversity are the very openings through which wisdom and transformation enter our lives."
      },
      {
        id: 3,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Faiz Ahmed Faiz",
        tagline: "Hope & Resilience",
        quote: "दिल ना-उमीद तो नहीं नाकाम ही तो है\nलम्बी है ग़म की शाम मगर शाम ही तो है",
        author: "फ़ैज़ अहमद फ़ैज़",
        summary: "Failure is not the end of hope. The evening of sorrow may be long, but it remains only an evening."
      },
      {
        id: 4,
        category: "Motivation",
        theme: "orange",
        title: "Allama Iqbal",
        tagline: "Self-Reliance",
        quote: "ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले\nख़ुदा बंदे से ख़ुद पूछे बता तेरी रज़ा क्या है",
        author: "अल्लामा इक़बाल",
        summary: "Elevate your inner character and strength so high that destiny itself bows to your will."
      },
      {
        id: 5,
        category: "Wisdom",
        theme: "gold",
        title: "Kabir Das",
        tagline: "Introspection",
        quote: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय\nजो दिल खोजा आपना, मुझसे बुरा न कोय",
        author: "संत कबीर",
        summary: "When I searched the world for evil, I found none outside; when I looked inside myself, I found my own flaws."
      },
      {
        id: 6,
        category: "Stoicism",
        theme: "emerald",
        title: "Marcus Aurelius",
        tagline: "Meditations",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        summary: "Internal fortitude comes from mastering your own reaction rather than attempting to control external circumstances."
      },
      {
        id: 7,
        category: "Inspiration",
        theme: "cyan",
        title: "Steve Jobs",
        tagline: "Stanford Address",
        quote: "Your time is limited, so don't waste it living someone else's life. Have the courage to follow your heart.",
        author: "Steve Jobs",
        summary: "Authenticity and courageous purpose are the only true shields against the regret of wasted time."
      },
      {
        id: 8,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Rahat Indori",
        tagline: "Unyielding Spirit",
        quote: "शाख़ों से टूट जाएँ वो पत्ते नहीं हैं हम\nआँधी से कोई कह दे कि औक़ात में रहे",
        author: "राहत इंदौरी",
        summary: "We are not brittle leaves that break from branches; tell the tempest to remember its limits."
      },
      {
        id: 9,
        category: "Hindi Poetry",
        theme: "gold",
        title: "Gulzar",
        tagline: "Passage of Time",
        quote: "वक़्त रहता नहीं कहीं टिक कर\nआदत इस की भी आदमी सी है",
        author: "गुलज़ार",
        summary: "Time never lingers in one place; its restless wanderlust mirrors human nature itself."
      },
      {
        id: 10,
        category: "Vision",
        theme: "blue",
        title: "APJ Abdul Kalam",
        tagline: "Wings of Fire",
        quote: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
        author: "Dr. A.P.J. Abdul Kalam",
        summary: "A true vision is an obsessive, relentless fire that keeps you driven toward tangible impact."
      },
      {
        id: 11,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Jaun Eliya",
        tagline: "Shayad",
        quote: "बे-दिली क्या यूँ ही दिन गुज़र जाएँगे\nसिर्फ़ ज़िंदा रहे हम तो मर जाएँगे",
        author: "जौन एलिया",
        summary: "Existing without heart and passion is not living; merely surviving is its own quiet death."
      },
      {
        id: 12,
        category: "Genius",
        theme: "emerald",
        title: "Albert Einstein",
        tagline: "Creative Thought",
        quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
        author: "Albert Einstein",
        summary: "Facts build the foundation, but unfettered creative vision is what sparks breakthrough progress."
      },
      {
        id: 13,
        category: "Hindi Poetry",
        theme: "orange",
        title: "Dushyant Kumar",
        tagline: "Revolutionary Call",
        quote: "हो गई है पीर पर्वत-सी पिघलनी चाहिए\nइस हिमालय से कोई गंगा निकलनी चाहिए",
        author: "दुष्यंत कुमार",
        summary: "When agony reaches the scale of mountains, only sweeping systemic transformation can melt it."
      },
      {
        id: 14,
        category: "Eastern Philosophy",
        theme: "cyan",
        title: "Lao Tzu",
        tagline: "Tao Te Ching",
        quote: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
        summary: "Monumental achievements are built solely from the courage to execute small, deliberate daily actions."
      },
      {
        id: 15,
        category: "Urdu Shayari",
        theme: "gold",
        title: "Sahir Ludhianvi",
        tagline: "Defiance & Grace",
        quote: "हज़ार बर्क़ गिरे लाख आँधियाँ उठें\nवो फूल खिल के रहेंगे जो खिलने वाले हैं",
        author: "साहिर लुधियानवी",
        summary: "Though a thousand lightning strikes fall, destiny cannot extinguish the bloom destined to blossom."
      },
      {
        id: 16,
        category: "Existentialism",
        theme: "purple",
        title: "Friedrich Nietzsche",
        tagline: "Will to Meaning",
        quote: "He who has a why to live can bear almost any how.",
        author: "Friedrich Nietzsche",
        summary: "With a transcendent purpose, a human being can endure any trial or adversity that arises."
      },
      {
        id: 17,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Mir Taqi Mir",
        tagline: "Dawn of Emotion",
        quote: "इब्तिदा-ए-इश्क़ है रोता है क्या\nआगे आगे देखिए होता है क्या",
        author: "मीर तक़ी मीर",
        summary: "This is merely the beginning of love's journey; hold steady and witness the depths that lie ahead."
      },
      {
        id: 18,
        category: "Leadership",
        theme: "emerald",
        title: "Nelson Mandela",
        tagline: "Unbreakable Resolve",
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        summary: "The barrier of impossibility is merely a psychological illusion broken by relentless action."
      },
      {
        id: 19,
        category: "Urdu Shayari",
        theme: "cyan",
        title: "Ahmad Faraz",
        tagline: "Ignite the Flame",
        quote: "शिकवा-ए-ज़ुल्मत-ए-शब से तो कहीं बेहतर था\nअपने हिस्से की कोई शमअ जलाते जाते",
        author: "अहमद फ़राज़",
        summary: "Instead of cursing the darkness of the night, how much better it is to light your own candle."
      },
      {
        id: 20,
        category: "Spiritual Power",
        theme: "orange",
        title: "Swami Vivekananda",
        tagline: "Awakening",
        quote: "Arise, awake, and stop not until the goal is reached.",
        author: "Swami Vivekananda",
        summary: "Shake off lethargy and doubt; direct the entirety of your focus toward the ultimate mission."
      },
      {
        id: 21,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Bahadur Shah Zafar",
        tagline: "Melancholy & Truth",
        quote: "ना किसी की आँख का नूर हूँ, ना किसी के दिल का क़रार हूँ\nजो किसी के काम ना आ सका मैं वो एक मुश्त-ए-ग़ुबार हूँ",
        author: "बहादुर शाह ज़फ़र",
        summary: "Poignant reflection on solitude and fleeting identity in the face of epochal change."
      },
      {
        id: 22,
        category: "Ethics",
        theme: "gold",
        title: "Aristotle",
        tagline: "Nicomachean Ethics",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
        summary: "Virtue and greatness are not singular dramatic feats, but the steady compounding of daily habits."
      },
      {
        id: 23,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Nida Fazli",
        tagline: "Path of Life",
        quote: "सफ़र में धूप तो होगी जो चल सको तो चलो\nसभी हैं भीड़ में तुम भी निकल सको तो चलो",
        author: "निदा फ़ाज़ली",
        summary: "The journey will inevitably bring scorch and trial; if you have the mettle to walk through the crowd, step forward."
      },
      {
        id: 24,
        category: "Resilience",
        theme: "blue",
        title: "Maya Angelou",
        tagline: "Inner Dignity",
        quote: "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
        author: "Maya Angelou",
        summary: "Adversity may touch your journey, but your dignity and inner sovereignty remain entirely yours."
      },
      {
        id: 25,
        category: "Urdu Shayari",
        theme: "emerald",
        title: "Bashir Badr",
        tagline: "True Companionship",
        quote: "उजालों में भी मिल जाएगा कोई ना कोई\nतलाश उसकी करो जो अंधेरों में साथ दे",
        author: "बशीर बद्र",
        summary: "In the brightness of prosperity, many gather; seek the true soul who stands beside you in deep dark."
      },
      {
        id: 26,
        category: "Persistence",
        theme: "cyan",
        title: "Confucius",
        tagline: "Continuous Motion",
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        summary: "Speed is irrelevant compared to constancy of direction and unbreakable momentum."
      },
      {
        id: 27,
        category: "Urdu Shayari",
        theme: "orange",
        title: "Waseem Barelvi",
        tagline: "Stand Your Ground",
        quote: "उसूलों पर जहाँ आँच आये टकराना ज़रूरी है\nजो ज़िन्दा हो तो फिर ज़िन्दा नज़र आना ज़रूरी है",
        author: "वसीम बरेलवी",
        summary: "When principles are threatened, one must confront the trial; if you are alive, your vitality must be undeniable."
      }
    ]
  },
  laws_of_power_27: {
    id: "laws_of_power_27",
    name: "48 Laws of Power (Part 1 • 27 Laws)",
    book: "The 48 Laws of Power",
    author: "Robert Greene",
    cards: [
      {
        number: "LAW 01",
        title: "Never Outshine the Master",
        explanation: "Always make those above you feel comfortably superior. In your desire to please and impress them, do not go too far in displaying your talents or you might accomplish the opposite—inspire fear and insecurity.",
        takeaway: "Make your masters appear more brilliant than they are and you will attain the heights of power."
      },
      {
        number: "LAW 02",
        title: "Never Put Too Much Trust in Friends, Learn to Use Enemies",
        explanation: "Be wary of friends—they will betray you more quickly, for they are easily aroused to envy. A former enemy will be more loyal than a friend, because he has more to prove.",
        takeaway: "You have more to fear from friends than from enemies. If you have no enemies, find a way to make them."
      },
      {
        number: "LAW 03",
        title: "Conceal Your Intentions",
        explanation: "Keep people off-balance and in the dark by never revealing the purpose behind your actions. If they have no clue what you are up to, they cannot prepare a defense.",
        takeaway: "Guide them far enough down the wrong path, wrap them in enough smoke, and by the time they realize your intentions, it will be too late."
      },
      {
        number: "LAW 04",
        title: "Always Say Less Than Necessary",
        explanation: "When you are trying to impress people with words, the more you say, the more common you appear, and the less in control. Powerful people impress and intimidate by saying less.",
        takeaway: "The more you say, the more likely you are to say something foolish."
      },
      {
        number: "LAW 05",
        title: "So Much Depends on Reputation – Guard It with Your Life",
        explanation: "Reputation is the cornerstone of power. Through reputation alone you can intimidate and win; once it slips, however, you are vulnerable, and will be attacked on all sides.",
        takeaway: "Make your reputation unassailable. Always be alert to potential attacks and thwart them before they happen."
      },
      {
        number: "LAW 06",
        title: "Court Attention at All Costs",
        explanation: "Everything is judged by its appearance; what is unseen counts for nothing. Never let yourself get lost in the crowd, then, or buried in oblivion. Stand out. Be conspicuous, at all costs.",
        takeaway: "Make yourself a magnet of attention by appearing larger, more colorful, more mysterious than the bland and timid masses."
      },
      {
        number: "LAW 07",
        title: "Get Others to Do the Work, but Always Take the Credit",
        explanation: "Use the wisdom, knowledge, and legwork of other people to further your own cause. Not only will such assistance save you valuable time and energy, it will impart to you a godlike aura of efficiency and speed.",
        takeaway: "In the end your helpers will be forgotten and you will be remembered. Never do yourself what others can do for you."
      },
      {
        number: "LAW 08",
        title: "Make Other People Come to You – Use Bait If Necessary",
        explanation: "When you force the other person to act, you are the one in control. It is always better to make your opponent come to you, abandoning his own plans in the process.",
        takeaway: "Lure him with fabulous gains—then attack. You hold all the cards."
      },
      {
        number: "LAW 09",
        title: "Win Through Your Actions, Never Through Argument",
        explanation: "Any momentary triumph you think you have gained through argument is really a Pyrrhic victory: The resentment and ill will you stir up is stronger and lasts longer than any momentary change of opinion.",
        takeaway: "It is much more powerful to get others to agree with you through your actions, without saying a word. Demonstrate, do not explicate."
      },
      {
        number: "LAW 10",
        title: "Infection: Avoid the Unhappy and Unlucky",
        explanation: "You can die from someone else’s misery—emotional states are as infectious as diseases. The infector may produce misfortune, but they draw it upon themselves, and their turbulent nature will engulf you too.",
        takeaway: "Associate only with the happy and fortunate instead."
      },
      {
        number: "LAW 11",
        title: "Learn to Keep People Dependent on You",
        explanation: "To maintain your independence you must always be needed and wanted. The more you are relied on, the more freedom you have.",
        takeaway: "Make people depend on you for their happiness and prosperity and you have nothing to fear. Never teach them enough so that they can do without you."
      },
      {
        number: "LAW 12",
        title: "Use Selective Honesty and Generosity to Disarm",
        explanation: "One sincere and honest move will cover over dozens of dishonest ones. Open-hearted gestures of honesty and generosity bring down the guard of even the most suspicious people.",
        takeaway: "Once your selective honesty opens a hole in their armor, you can deceive and manipulate them at will."
      },
      {
        number: "LAW 13",
        title: "When Asking for Help, Appeal to Self-Interest, Not Mercy",
        explanation: "If you need to turn to an ally for help, do not bother to remind him of your past assistance and good deeds. He will find a way to ignore you.",
        takeaway: "Uncover something in your request that will benefit him, and emphasize it out of all proportion. He will respond enthusiastically when he sees something to be gained."
      },
      {
        number: "LAW 14",
        title: "Pose as a Friend, Work as a Spy",
        explanation: "Knowledge about your rival is critical. Use spies to gather valuable information that will keep you a step ahead. Better still: Play the spy yourself.",
        takeaway: "In polite social encounters, learn to probe. Ask indirect questions to get people to reveal their weaknesses and intentions."
      },
      {
        number: "LAW 15",
        title: "Crush Your Enemy Totally",
        explanation: "All great leaders since Moses have known that a feared enemy must be crushed completely. If one ember is left alight, no matter how dimly it smolders, a fire will eventually break out.",
        takeaway: "More is lost through stopping halfway than through total annihilation: The enemy will recover, and will seek revenge. Crush him, not only in body but in spirit."
      },
      {
        number: "LAW 16",
        title: "Use Absence to Increase Respect and Honor",
        explanation: "Too much circulation makes the price go down: The more you are seen and heard from, the more common you appear. If you are already established in a group, temporary withdrawal will make you more talked about.",
        takeaway: "You must learn when to leave. Create value through scarcity."
      },
      {
        number: "LAW 17",
        title: "Keep Others in Suspended Terror: Cultivate Unpredictability",
        explanation: "Humans are creatures of habit with an insatiable need to see familiarity in other people's actions. Your predictability gives them a sense of control.",
        takeaway: "Turn the tables: Be deliberately unpredictable. An attitude that seems to have no consistency or purpose will keep them off-balance and exhausted."
      },
      {
        number: "LAW 18",
        title: "Do Not Build Fortresses to Protect Yourself – Isolation Is Dangerous",
        explanation: "The world is harsh and enemies are everywhere—everyone has to protect themselves. But a fortress seems the safest, yet isolation exposes you to more dangers than it protects you from.",
        takeaway: "It cuts you off from valuable information, makes you conspicuous and an easy target. Better to circulate among people, find allies, and mingle."
      },
      {
        number: "LAW 19",
        title: "Know Who You’re Dealing with – Do Not Offend the Wrong Person",
        explanation: "There are many different kinds of people in the world, and you can never assume that everyone will react to your strategies in the same way.",
        takeaway: "Deceive or outmaneuver some people and they will spend the rest of their lives seeking revenge. Choose your victims and opponents carefully."
      },
      {
        number: "LAW 20",
        title: "Do Not Commit to Anyone",
        explanation: "It is the fool who always rushes to take sides. Do not commit yourself to any side or cause but yourself.",
        takeaway: "By maintaining your independence, you become the master of others—playing people against one another, making them pursue you."
      },
      {
        number: "LAW 21",
        title: "Play a Sucker to Catch a Sucker – Seem Dumber Than Your Mark",
        explanation: "No one likes feeling stupider than the next person. The trick, then, is to make your victims feel smart—and not just smart, but smarter than you are.",
        takeaway: "Once convinced of this, they will never suspect that you may have ulterior motives."
      },
      {
        number: "LAW 22",
        title: "Use the Surrender Tactic: Transform Weakness into Power",
        explanation: "When you are weaker, never fight for honor’s sake; choose surrender instead. Surrender gives you time to recover, time to torment and irritate your conqueror, time to wait for his power to wane.",
        takeaway: "Do not give him the satisfaction of fighting and defeating you—surrender first. Turn the other cheek and furious anger will burn him out."
      },
      {
        number: "LAW 23",
        title: "Concentrate Your Forces",
        explanation: "Conserve your energies and strengths by keeping them concentrated at their strongest point. You gain more by finding a rich mine and mining it deeper, than by flitting from one shallow mine to another.",
        takeaway: "Intensity defeats extensity every time. Find the single key patron or leverage point and focus entirely on it."
      },
      {
        number: "LAW 24",
        title: "Play the Perfect Courtier",
        explanation: "The perfect courtier thrives in a world where everything revolves around power and political dexterity. He has mastered the art of indirection; he flatters, yields to superiors, and asserts power over others in the most graceful manner.",
        takeaway: "Learn and apply the laws of courtiership and there will be no limit to how far you can rise."
      },
      {
        number: "LAW 25",
        title: "Re-Create Yourself",
        explanation: "Do not accept the roles that society foists on you. Re-create yourself by forging a new identity, one that commands attention and never bores the audience.",
        takeaway: "Be the master of your own image rather than letting others define it for you. Incorporate dramatic devices into your public gestures and actions."
      },
      {
        number: "LAW 26",
        title: "Keep Your Hands Clean",
        explanation: "You must seem a paragon of civility and efficiency: Your hands are never soiled by mistakes and nasty deeds.",
        takeaway: "Maintain such a spotless appearance by using others as scapegoats and cat’s-paws to disguise your involvement."
      },
      {
        number: "LAW 27",
        title: "Play on People’s Need to Believe to Create a Cult",
        explanation: "People have an overwhelming desire to believe in something. Become the focal point of such desire by offering them a cause, a new faith to follow. Keep your words vague but full of promise.",
        takeaway: "In the absence of organized religion and grand causes, your new belief system will bring you untold power."
      }
    ]
  },
  laws_of_power_54: {
    id: "laws_of_power_54",
    name: "48 Laws of Power & Mastery (Full 54 Cards • 2 Sheets)",
    book: "The 48 Laws of Power & Mastery",
    author: "Robert Greene",
    cards: [
      {
        number: "LAW 01",
        title: "Never Outshine the Master",
        explanation: "Always make those above you feel comfortably superior. In your desire to please and impress them, do not go too far in displaying your talents or you might accomplish the opposite—inspire fear and insecurity.",
        takeaway: "Make your masters appear more brilliant than they are and you will attain the heights of power."
      },
      {
        number: "LAW 02",
        title: "Never Put Too Much Trust in Friends, Learn to Use Enemies",
        explanation: "Be wary of friends—they will betray you more quickly, for they are easily aroused to envy. A former enemy will be more loyal than a friend, because he has more to prove.",
        takeaway: "You have more to fear from friends than from enemies. If you have no enemies, find a way to make them."
      },
      {
        number: "LAW 03",
        title: "Conceal Your Intentions",
        explanation: "Keep people off-balance and in the dark by never revealing the purpose behind your actions. If they have no clue what you are up to, they cannot prepare a defense.",
        takeaway: "Guide them far enough down the wrong path, wrap them in enough smoke, and by the time they realize your intentions, it will be too late."
      },
      {
        number: "LAW 04",
        title: "Always Say Less Than Necessary",
        explanation: "When you are trying to impress people with words, the more you say, the more common you appear, and the less in control. Powerful people impress and intimidate by saying less.",
        takeaway: "The more you say, the more likely you are to say something foolish."
      },
      {
        number: "LAW 05",
        title: "So Much Depends on Reputation – Guard It with Your Life",
        explanation: "Reputation is the cornerstone of power. Through reputation alone you can intimidate and win; once it slips, however, you are vulnerable, and will be attacked on all sides.",
        takeaway: "Make your reputation unassailable. Always be alert to potential attacks and thwart them before they happen."
      },
      {
        number: "LAW 06",
        title: "Court Attention at All Costs",
        explanation: "Everything is judged by its appearance; what is unseen counts for nothing. Never let yourself get lost in the crowd, then, or buried in oblivion. Stand out. Be conspicuous, at all costs.",
        takeaway: "Make yourself a magnet of attention by appearing larger, more colorful, more mysterious than the bland and timid masses."
      },
      {
        number: "LAW 07",
        title: "Get Others to Do the Work, but Always Take the Credit",
        explanation: "Use the wisdom, knowledge, and legwork of other people to further your own cause. Not only will such assistance save you valuable time and energy, it will impart to you a godlike aura of efficiency and speed.",
        takeaway: "In the end your helpers will be forgotten and you will be remembered. Never do yourself what others can do for you."
      },
      {
        number: "LAW 08",
        title: "Make Other People Come to You – Use Bait If Necessary",
        explanation: "When you force the other person to act, you are the one in control. It is always better to make your opponent come to you, abandoning his own plans in the process.",
        takeaway: "Lure him with fabulous gains—then attack. You hold all the cards."
      },
      {
        number: "LAW 09",
        title: "Win Through Your Actions, Never Through Argument",
        explanation: "Any momentary triumph you think you have gained through argument is really a Pyrrhic victory: The resentment and ill will you stir up is stronger and lasts longer than any momentary change of opinion.",
        takeaway: "It is much more powerful to get others to agree with you through your actions, without saying a word. Demonstrate, do not explicate."
      },
      {
        number: "LAW 10",
        title: "Infection: Avoid the Unhappy and Unlucky",
        explanation: "You can die from someone else’s misery—emotional states are as infectious as diseases. The infector may produce misfortune, but they draw it upon themselves, and their turbulent nature will engulf you too.",
        takeaway: "Associate only with the happy and fortunate instead."
      },
      {
        number: "LAW 11",
        title: "Learn to Keep People Dependent on You",
        explanation: "To maintain your independence you must always be needed and wanted. The more you are relied on, the more freedom you have.",
        takeaway: "Make people depend on you for their happiness and prosperity and you have nothing to fear. Never teach them enough so that they can do without you."
      },
      {
        number: "LAW 12",
        title: "Use Selective Honesty and Generosity to Disarm",
        explanation: "One sincere and honest move will cover over dozens of dishonest ones. Open-hearted gestures of honesty and generosity bring down the guard of even the most suspicious people.",
        takeaway: "Once your selective honesty opens a hole in their armor, you can deceive and manipulate them at will."
      },
      {
        number: "LAW 13",
        title: "When Asking for Help, Appeal to Self-Interest, Not Mercy",
        explanation: "If you need to turn to an ally for help, do not bother to remind him of your past assistance and good deeds. He will find a way to ignore you.",
        takeaway: "Uncover something in your request that will benefit him, and emphasize it out of all proportion. He will respond enthusiastically when he sees something to be gained."
      },
      {
        number: "LAW 14",
        title: "Pose as a Friend, Work as a Spy",
        explanation: "Knowledge about your rival is critical. Use spies to gather valuable information that will keep you a step ahead. Better still: Play the spy yourself.",
        takeaway: "In polite social encounters, learn to probe. Ask indirect questions to get people to reveal their weaknesses and intentions."
      },
      {
        number: "LAW 15",
        title: "Crush Your Enemy Totally",
        explanation: "All great leaders since Moses have known that a feared enemy must be crushed completely. If one ember is left alight, no matter how dimly it smolders, a fire will eventually break out.",
        takeaway: "More is lost through stopping halfway than through total annihilation: The enemy will recover, and will seek revenge. Crush him, not only in body but in spirit."
      },
      {
        number: "LAW 16",
        title: "Use Absence to Increase Respect and Honor",
        explanation: "Too much circulation makes the price go down: The more you are seen and heard from, the more common you appear. If you are already established in a group, temporary withdrawal will make you more talked about.",
        takeaway: "You must learn when to leave. Create value through scarcity."
      },
      {
        number: "LAW 17",
        title: "Keep Others in Suspended Terror: Cultivate Unpredictability",
        explanation: "Humans are creatures of habit with an insatiable need to see familiarity in other people's actions. Your predictability gives them a sense of control.",
        takeaway: "Turn the tables: Be deliberately unpredictable. An attitude that seems to have no consistency or purpose will keep them off-balance and exhausted."
      },
      {
        number: "LAW 18",
        title: "Do Not Build Fortresses to Protect Yourself – Isolation Is Dangerous",
        explanation: "The world is harsh and enemies are everywhere—everyone has to protect themselves. But a fortress seems the safest, yet isolation exposes you to more dangers than it protects you from.",
        takeaway: "It cuts you off from valuable information, makes you conspicuous and an easy target. Better to circulate among people, find allies, and mingle."
      },
      {
        number: "LAW 19",
        title: "Know Who You’re Dealing with – Do Not Offend the Wrong Person",
        explanation: "There are many different kinds of people in the world, and you can never assume that everyone will react to your strategies in the same way.",
        takeaway: "Deceive or outmaneuver some people and they will spend the rest of their lives seeking revenge. Choose your victims and opponents carefully."
      },
      {
        number: "LAW 20",
        title: "Do Not Commit to Anyone",
        explanation: "It is the fool who always rushes to take sides. Do not commit yourself to any side or cause but yourself.",
        takeaway: "By maintaining your independence, you become the master of others—playing people against one another, making them pursue you."
      },
      {
        number: "LAW 21",
        title: "Play a Sucker to Catch a Sucker – Seem Dumber Than Your Mark",
        explanation: "No one likes feeling stupider than the next person. The trick, then, is to make your victims feel smart—and not just smart, but smarter than you are.",
        takeaway: "Once convinced of this, they will never suspect that you may have ulterior motives."
      },
      {
        number: "LAW 22",
        title: "Use the Surrender Tactic: Transform Weakness into Power",
        explanation: "When you are weaker, never fight for honor’s sake; choose surrender instead. Surrender gives you time to recover, time to torment and irritate your conqueror, time to wait for his power to wane.",
        takeaway: "Do not give him the satisfaction of fighting and defeating you—surrender first. Turn the other cheek and furious anger will burn him out."
      },
      {
        number: "LAW 23",
        title: "Concentrate Your Forces",
        explanation: "Conserve your energies and strengths by keeping them concentrated at their strongest point. You gain more by finding a rich mine and mining it deeper, than by flitting from one shallow mine to another.",
        takeaway: "Intensity defeats extensity every time. Find the single key patron or leverage point and focus entirely on it."
      },
      {
        number: "LAW 24",
        title: "Play the Perfect Courtier",
        explanation: "The perfect courtier thrives in a world where everything revolves around power and political dexterity. He has mastered the art of indirection; he flatters, yields to superiors, and asserts power over others in the most graceful manner.",
        takeaway: "Learn and apply the laws of courtiership and there will be no limit to how far you can rise."
      },
      {
        number: "LAW 25",
        title: "Re-Create Yourself",
        explanation: "Do not accept the roles that society foists on you. Re-create yourself by forging a new identity, one that commands attention and never bores the audience.",
        takeaway: "Be the master of your own image rather than letting others define it for you. Incorporate dramatic devices into your public gestures and actions."
      },
      {
        number: "LAW 26",
        title: "Keep Your Hands Clean",
        explanation: "You must seem a paragon of civility and efficiency: Your hands are never soiled by mistakes and nasty deeds.",
        takeaway: "Maintain such a spotless appearance by using others as scapegoats and cat’s-paws to disguise your involvement."
      },
      {
        number: "LAW 27",
        title: "Play on People’s Need to Believe to Create a Cult",
        explanation: "People have an overwhelming desire to believe in something. Become the focal point of such desire by offering them a cause, a new faith to follow. Keep your words vague but full of promise.",
        takeaway: "In the absence of organized religion and grand causes, your new belief system will bring you untold power."
      }
,
      {
        number: "LAW 28",
        title: "Enter Action with Boldness",
        explanation: "If you are unsure of a course of action, do not attempt it. Your doubts and hesitations will infect your execution. Timidity is dangerous; better to enter with boldness.",
        takeaway: "Any mistakes you commit through audacity are easily corrected with more audacity. Everyone admires the bold."
      },
      {
        number: "LAW 29",
        title: "Plan All the Way to the End",
        explanation: "The ending is everything. Plan all the way to it, taking into account all the possible consequences, obstacles, and twists of fortune that might reverse your hard work.",
        takeaway: "By planning to the end you will not be overwhelmed by circumstances and you will know when to stop."
      },
      {
        number: "LAW 30",
        title: "Make Your Accomplishments Seem Effortless",
        explanation: "Your actions must seem natural and executed with ease. All the toil and practice that go into them, and also all the clever tricks, must be concealed.",
        takeaway: "When you act, act effortlessly, as if you could do much more. Avoid the temptation of revealing how hard you work."
      },
      {
        number: "LAW 31",
        title: "Control the Options: Get Others to Play with Cards You Deal",
        explanation: "The best deceptions are the ones that seem to give the other person a choice: Your victims feel they are in control, but are actually your puppets.",
        takeaway: "Give people choices that come out in your favor whichever one they select. Force them to make choices between the lesser of two evils."
      },
      {
        number: "LAW 32",
        title: "Play to People's Fantasies",
        explanation: "The truth is often avoided because it is ugly and unpleasant. Never appeal to truth and reality unless you are prepared for the anger that comes from disenchantment.",
        takeaway: "Life is so harsh that people who can manufacture romance or conjure up fantasy are like oases in the desert."
      },
      {
        number: "LAW 33",
        title: "Discover Each Man's Thumbscrew",
        explanation: "Everyone has a weakness, a gap in the castle wall. That weakness is usually an insecurity, an uncontrollable emotion, or a secret pleasure.",
        takeaway: "Once found, it is a thumbscrew that you can turn to your advantage."
      },
      {
        number: "LAW 34",
        title: "Be Royal in Your Own Fashion: Act like a King to Be Treated Like One",
        explanation: "The way you carry yourself will often determine how you are treated: In the long run, appearing vulgar or common will make people disrespect you.",
        takeaway: "For a king respects himself and inspires the same sentiment in others. By acting regally, you make yourself destined for a crown."
      },
      {
        number: "LAW 35",
        title: "Master the Art of Timing",
        explanation: "Never seem to be in a hurry\u2014hurrying betrays a lack of control over yourself and over time. Always seem patient, as if you know that everything will come to you eventually.",
        takeaway: "Become a detective of the right moment; sniff out the spirits of the times and trends that will carry you to power."
      },
      {
        number: "LAW 36",
        title: "Disdain Things You Cannot Have: Ignoring Them Is Best Revenge",
        explanation: "By acknowledging petty problems you give them existence and credibility. The more attention you pay an enemy, the stronger you make him.",
        takeaway: "If there is something you want but cannot have, show contempt for it. Act as if it were of no consequence."
      },
      {
        number: "LAW 37",
        title: "Create Compelling Spectacles",
        explanation: "Striking imagery and grand symbolic gestures create the aura of power\u2014everyone responds to them. Stage spectacles for those around you, full of visual intrigue and radiant symbols.",
        takeaway: "Dazzled by appearances, no one will notice what you are really doing."
      },
      {
        number: "LAW 38",
        title: "Think as You Like But Behave Like Others",
        explanation: "If you make a show of going against the times, flaunting your unconventional ideas and unorthodox ways, people will think that you only want attention and despise them.",
        takeaway: "Share your originality only with tolerant friends and those who are sure to appreciate your uniqueness."
      },
      {
        number: "LAW 39",
        title: "Stir Up Waters to Catch Fish",
        explanation: "Anger and emotion are strategically counterproductive. You must always stay calm and objective. But if you can make your enemies angry while staying calm, you gain a decided advantage.",
        takeaway: "Put your enemies off-balance: Find the chink in their vanity through which you can rattle them."
      },
      {
        number: "LAW 40",
        title: "Despise the Free Lunch",
        explanation: "What is offered for free is dangerous\u2014it usually involves either a trick or a hidden obligation. What has worth is worth paying for.",
        takeaway: "By paying your own way you stay clear of gratitude, guilt, and deceit. Be lavish with your money; generosity is a sign and magnet for power."
      },
      {
        number: "LAW 41",
        title: "Avoid Stepping into a Great Man's Shoes",
        explanation: "What happens first always appears better and more original than what comes after. If you succeed a great man or have a famous parent, you will have to accomplish double their achievements to outshine them.",
        takeaway: "Establish your own name and identity by changing course. Slay the overbearing father and assert your own mastery."
      },
      {
        number: "LAW 42",
        title: "Strike the Shepherd and the Sheep Will Scatter",
        explanation: "Trouble can often be traced to a single strong individual\u2014the stirrer, the arrogant subordinate, the poisoner of goodwill.",
        takeaway: "Do not wait for the troubles they cause to multiply. Neutralize their influence by isolating or banishing them."
      },
      {
        number: "LAW 43",
        title: "Work on the Hearts and Minds of Others",
        explanation: "Coercion creates a reaction that will eventually work against you. You must seduce others into wanting to move in your direction.",
        takeaway: "A person you have seduced becomes your loyal pawn. The way to seduce others is to operate on their individual psychologies and weaknesses."
      },
      {
        number: "LAW 44",
        title: "Disarm and Infuriate with the Mirror Effect",
        explanation: "The mirror reflects reality, but it is also the perfect tool for deception. When you mirror your enemies, doing exactly as they do, they cannot figure out your strategy.",
        takeaway: "The Mirror Effect mocks and humiliates them, making them overreact. By holding up a mirror to their psyches, you seduce them with the illusion that you share their values."
      },
      {
        number: "LAW 45",
        title: "Preach the Need for Change, But Never Reform Too Much at Once",
        explanation: "Everyone understands the need for change in the abstract, but on the day-to-day level people are creatures of habit. Too much innovation is traumatic and will lead to revolt.",
        takeaway: "If you are new to a position of power, make a show of respecting the old way of doing things. If change is necessary, make it feel like a gentle improvement on the past."
      },
      {
        number: "LAW 46",
        title: "Never Appear Too Perfect",
        explanation: "Appearing better than others is always dangerous, but most dangerous of all is to appear to have no faults or weaknesses. Envy creates silent enemies.",
        takeaway: "It is smart to occasionally display defects and admit to harmless vices, in order to deflect envy and appear more human and approachable."
      },
      {
        number: "LAW 47",
        title: "Do Not Go Past the Mark You Aimed For; In Victory, Know When to Stop",
        explanation: "The moment of victory is often the moment of greatest peril. In the heat of victory, arrogance and overconfidence can push you past the goal you had aimed for.",
        takeaway: "There is no substitute for strategy and careful planning. Set a goal, and when you reach it, stop."
      },
      {
        number: "LAW 48",
        title: "Assume Formlessness",
        explanation: "By taking a shape, by having a visible plan, you open yourself to attack. Instead of taking a form for your enemy to grasp, keep yourself adaptable and on the move.",
        takeaway: "Accept the fact that nothing is certain and no law is fixed. The best way to protect yourself is to be as fluid and formless as water."
      },
      {
        number: "RULE 49",
        title: "Discover Your Life's Task",
        explanation: "You possess an inner force that seeks to guide you toward your Life's Task\u2014what you are naturally born to accomplish. This force was evident in your childhood inclinations.",
        takeaway: "Mastery begins by reconnecting with your deepest inclinations and choosing a career path that aligns with your true nature."
      },
      {
        number: "RULE 50",
        title: "Submit to the Ideal Apprenticeship",
        explanation: "Whenever you enter a new field, you must view the first years as an apprenticeship whose sole goal is learning and skill acquisition, not money or immediate status.",
        takeaway: "Value learning over immediate rewards; embrace deep observation, practice, and experimentation to build true mastery."
      },
      {
        number: "RULE 51",
        title: "Absorb the Master's Power",
        explanation: "Life is short and your time for learning is limited. The most effective way to accelerate your progress is to find a suitable mentor who has already mastered the craft.",
        takeaway: "A mentor guides your focus, corrects flaws in real-time, and transfers decades of tacit knowledge directly to you."
      },
      {
        number: "RULE 52",
        title: "See People as They Are (Social Intelligence)",
        explanation: "Often the greatest obstacle to mastery is not a lack of skill, but the emotional drama, misunderstandings, and friction caused by other people.",
        takeaway: "Cultivate radical realism about human nature: Accept people's flaws, decode their non-verbal cues, and master social dynamics."
      },
      {
        number: "RULE 53",
        title: "The Creative-Active Mind",
        explanation: "As you acquire skills and knowledge, your mind must not become rigid or dogmatic. You must actively break conventional rules, connect unrelated ideas, and experiment boldly.",
        takeaway: "Keep your mind fluid and open to anomalies; creative breakthroughs occur when you recombine established ideas in novel ways."
      },
      {
        number: "RULE 54",
        title: "Synthesize Intuition and Rationality (Mastery)",
        explanation: "High-level mastery is achieved when analytical thinking and deep intuitive feeling merge seamlessly into instantaneous insight and effortless execution.",
        takeaway: "After 10,000 hours of intense practice, the brain perceives the entire field at once\u2014you feel the answer before you can explain it."
      }
    ]
  },
  shayari_quotes_54: {
    id: "shayari_quotes_54",
    name: "Quotes & Shayari (54 Cards • 2 Sheets)",
    category: "Quotes & Shayari",
    theme: "purple",
    cards: [
      {
        id: 1,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Mirza Ghalib",
        tagline: "Diwan-e-Ghalib",
        quote: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\nबहुत निकले मिरे अरमान लेकिन फिर भी कम निकले",
        author: "मिर्ज़ा ग़ालिब",
        summary: "Human desires are endless; no matter how many are fulfilled, countless more remain."
      },
      {
        id: 2,
        category: "Philosophy",
        theme: "cyan",
        title: "Rumi",
        tagline: "Mystic Wisdom",
        quote: "The wound is the place where the Light enters you.",
        author: "Jalal al-Din Rumi",
        summary: "Suffering and adversity are the very openings through which wisdom and transformation enter our lives."
      },
      {
        id: 3,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Faiz Ahmed Faiz",
        tagline: "Hope & Resilience",
        quote: "दिल ना-उमीद तो नहीं नाकाम ही तो है\nलम्बी है ग़म की शाम मगर शाम ही तो है",
        author: "फ़ैज़ अहमद फ़ैज़",
        summary: "Failure is not the end of hope. The evening of sorrow may be long, but it remains only an evening."
      },
      {
        id: 4,
        category: "Motivation",
        theme: "orange",
        title: "Allama Iqbal",
        tagline: "Self-Reliance",
        quote: "ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले\nख़ुदा बंदे से ख़ुद पूछे बता तेरी रज़ा क्या है",
        author: "अल्लामा इक़बाल",
        summary: "Elevate your inner character and strength so high that destiny itself bows to your will."
      },
      {
        id: 5,
        category: "Wisdom",
        theme: "gold",
        title: "Kabir Das",
        tagline: "Introspection",
        quote: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय\nजो दिल खोजा आपना, मुझसे बुरा न कोय",
        author: "संत कबीर",
        summary: "When I searched the world for evil, I found none outside; when I looked inside myself, I found my own flaws."
      },
      {
        id: 6,
        category: "Stoicism",
        theme: "emerald",
        title: "Marcus Aurelius",
        tagline: "Meditations",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        summary: "Internal fortitude comes from mastering your own reaction rather than attempting to control external circumstances."
      },
      {
        id: 7,
        category: "Inspiration",
        theme: "cyan",
        title: "Steve Jobs",
        tagline: "Stanford Address",
        quote: "Your time is limited, so don't waste it living someone else's life. Have the courage to follow your heart.",
        author: "Steve Jobs",
        summary: "Authenticity and courageous purpose are the only true shields against the regret of wasted time."
      },
      {
        id: 8,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Rahat Indori",
        tagline: "Unyielding Spirit",
        quote: "शाख़ों से टूट जाएँ वो पत्ते नहीं हैं हम\nआँधी से कोई कह दे कि औक़ात में रहे",
        author: "राहत इंदौरी",
        summary: "We are not brittle leaves that break from branches; tell the tempest to remember its limits."
      },
      {
        id: 9,
        category: "Hindi Poetry",
        theme: "gold",
        title: "Gulzar",
        tagline: "Passage of Time",
        quote: "वक़्त रहता नहीं कहीं टिक कर\nआदत इस की भी आदमी सी है",
        author: "गुलज़ार",
        summary: "Time never lingers in one place; its restless wanderlust mirrors human nature itself."
      },
      {
        id: 10,
        category: "Vision",
        theme: "blue",
        title: "APJ Abdul Kalam",
        tagline: "Wings of Fire",
        quote: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
        author: "Dr. A.P.J. Abdul Kalam",
        summary: "A true vision is an obsessive, relentless fire that keeps you driven toward tangible impact."
      },
      {
        id: 11,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Jaun Eliya",
        tagline: "Shayad",
        quote: "बे-दिली क्या यूँ ही दिन गुज़र जाएँगे\nसिर्फ़ ज़िंदा रहे हम तो मर जाएँगे",
        author: "जौन एलिया",
        summary: "Existing without heart and passion is not living; merely surviving is its own quiet death."
      },
      {
        id: 12,
        category: "Genius",
        theme: "emerald",
        title: "Albert Einstein",
        tagline: "Creative Thought",
        quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
        author: "Albert Einstein",
        summary: "Facts build the foundation, but unfettered creative vision is what sparks breakthrough progress."
      },
      {
        id: 13,
        category: "Hindi Poetry",
        theme: "orange",
        title: "Dushyant Kumar",
        tagline: "Revolutionary Call",
        quote: "हो गई है पीर पर्वत-सी पिघलनी चाहिए\nइस हिमालय से कोई गंगा निकलनी चाहिए",
        author: "दुष्यंत कुमार",
        summary: "When agony reaches the scale of mountains, only sweeping systemic transformation can melt it."
      },
      {
        id: 14,
        category: "Eastern Philosophy",
        theme: "cyan",
        title: "Lao Tzu",
        tagline: "Tao Te Ching",
        quote: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
        summary: "Monumental achievements are built solely from the courage to execute small, deliberate daily actions."
      },
      {
        id: 15,
        category: "Urdu Shayari",
        theme: "gold",
        title: "Sahir Ludhianvi",
        tagline: "Defiance & Grace",
        quote: "हज़ार बर्क़ गिरे लाख आँधियाँ उठें\nवो फूल खिल के रहेंगे जो खिलने वाले हैं",
        author: "साहिर लुधियानवी",
        summary: "Though a thousand lightning strikes fall, destiny cannot extinguish the bloom destined to blossom."
      },
      {
        id: 16,
        category: "Existentialism",
        theme: "purple",
        title: "Friedrich Nietzsche",
        tagline: "Will to Meaning",
        quote: "He who has a why to live can bear almost any how.",
        author: "Friedrich Nietzsche",
        summary: "With a transcendent purpose, a human being can endure any trial or adversity that arises."
      },
      {
        id: 17,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Mir Taqi Mir",
        tagline: "Dawn of Emotion",
        quote: "इब्तिदा-ए-इश्क़ है रोता है क्या\nआगे आगे देखिए होता है क्या",
        author: "मीर तक़ी मीर",
        summary: "This is merely the beginning of love's journey; hold steady and witness the depths that lie ahead."
      },
      {
        id: 18,
        category: "Leadership",
        theme: "emerald",
        title: "Nelson Mandela",
        tagline: "Unbreakable Resolve",
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        summary: "The barrier of impossibility is merely a psychological illusion broken by relentless action."
      },
      {
        id: 19,
        category: "Urdu Shayari",
        theme: "cyan",
        title: "Ahmad Faraz",
        tagline: "Ignite the Flame",
        quote: "शिकवा-ए-ज़ुल्मत-ए-शब से तो कहीं बेहतर था\nअपने हिस्से की कोई शमअ जलाते जाते",
        author: "अहमद फ़राज़",
        summary: "Instead of cursing the darkness of the night, how much better it is to light your own candle."
      },
      {
        id: 20,
        category: "Spiritual Power",
        theme: "orange",
        title: "Swami Vivekananda",
        tagline: "Awakening",
        quote: "Arise, awake, and stop not until the goal is reached.",
        author: "Swami Vivekananda",
        summary: "Shake off lethargy and doubt; direct the entirety of your focus toward the ultimate mission."
      },
      {
        id: 21,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Bahadur Shah Zafar",
        tagline: "Melancholy & Truth",
        quote: "ना किसी की आँख का नूर हूँ, ना किसी के दिल का क़रार हूँ\nजो किसी के काम ना आ सका मैं वो एक मुश्त-ए-ग़ुबार हूँ",
        author: "बहादुर शाह ज़फ़र",
        summary: "Poignant reflection on solitude and fleeting identity in the face of epochal change."
      },
      {
        id: 22,
        category: "Ethics",
        theme: "gold",
        title: "Aristotle",
        tagline: "Nicomachean Ethics",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
        summary: "Virtue and greatness are not singular dramatic feats, but the steady compounding of daily habits."
      },
      {
        id: 23,
        category: "Urdu Shayari",
        theme: "rose",
        title: "Nida Fazli",
        tagline: "Path of Life",
        quote: "सफ़र में धूप तो होगी जो चल सको तो चलो\nसभी हैं भीड़ में तुम भी निकल सको तो चलो",
        author: "निदा फ़ाज़ली",
        summary: "The journey will inevitably bring scorch and trial; if you have the mettle to walk through the crowd, step forward."
      },
      {
        id: 24,
        category: "Resilience",
        theme: "blue",
        title: "Maya Angelou",
        tagline: "Inner Dignity",
        quote: "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
        author: "Maya Angelou",
        summary: "Adversity may touch your journey, but your dignity and inner sovereignty remain entirely yours."
      },
      {
        id: 25,
        category: "Urdu Shayari",
        theme: "emerald",
        title: "Bashir Badr",
        tagline: "True Companionship",
        quote: "उजालों में भी मिल जाएगा कोई ना कोई\nतलाश उसकी करो जो अंधेरों में साथ दे",
        author: "बशीर बद्र",
        summary: "In the brightness of prosperity, many gather; seek the true soul who stands beside you in deep dark."
      },
      {
        id: 26,
        category: "Persistence",
        theme: "cyan",
        title: "Confucius",
        tagline: "Continuous Motion",
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        summary: "Speed is irrelevant compared to constancy of direction and unbreakable momentum."
      },
      {
        id: 27,
        category: "Urdu Shayari",
        theme: "orange",
        title: "Waseem Barelvi",
        tagline: "Stand Your Ground",
        quote: "उसूलों पर जहाँ आँच आये टकराना ज़रूरी है\nजो ज़िन्दा हो तो फिर ज़िन्दा नज़र आना ज़रूरी है",
        author: "वसीम बरेलवी",
        summary: "When principles are threatened, one must confront the trial; if you are alive, your vitality must be undeniable."
      }
,
      {
        id: 28,
        category: "Philosophy",
        theme: "emerald",
        title: "Allama Iqbal",
        tagline: "Shikwa",
        quote: "\u0924\u0942 \u0936\u093e\u0939\u0940\u0902 \u0939\u0948 \u092a\u0930\u0935\u093e\u091c\u093c \u0939\u0948 \u0915\u093e\u092e \u0924\u093f\u0930\u093e\n\u0924\u093f\u0930\u0947 \u0938\u093e\u092e\u0928\u0947 \u0906\u0938\u092e\u093e\u0901 \u0914\u0930 \u092d\u0940 \u0939\u0948\u0902",
        author: "\u0905\u0932\u094d\u0932\u093e\u092e\u093e \u0907\u0915\u093c\u092c\u093e\u0932",
        summary: "You are a falcon; your destiny is flight. Endless skies await you beyond this horizon."
      },
      {
        id: 29,
        category: "Urdu Shayari",
        theme: "orange",
        title: "Munir Niazi",
        tagline: "Diyare Noor",
        quote: "\u092c\u0941\u0932\u0902\u0926\u0940 \u0926\u0947\u0930 \u0924\u0915 \u0915\u093f\u0938 \u0936\u0916\u093c\u094d\u0938 \u0915\u0947 \u0939\u093f\u0938\u094d\u0938\u0947 \u092e\u0947\u0902 \u0930\u0939\u0924\u0940 \u0939\u0948\n\u092c\u0939\u0941\u0924 \u090a\u0902\u091a\u0940 \u0907\u092e\u093e\u0930\u0924 \u0939\u0930 \u0918\u0921\u093c\u0940 \u0916\u093c\u0924\u0930\u0947 \u092e\u0947\u0902 \u0930\u0939\u0924\u0940 \u0939\u0948",
        author: "\u092e\u0941\u0928\u0940\u0930 \u0928\u093f\u092f\u093e\u091c\u093c\u0940",
        summary: "Extreme heights cannot be held forever; tall buildings always face the strongest storms."
      },
      {
        id: 30,
        category: "Urdu Shayari",
        theme: "gold",
        title: "Allama Iqbal",
        tagline: "Bal-e-Jibril",
        quote: "\u092e\u0902\u091c\u093c\u093f\u0932 \u0938\u0947 \u0906\u0917\u0947 \u092c\u0922\u093c \u0915\u0930 \u092e\u0902\u091c\u093c\u093f\u0932 \u0924\u0932\u093e\u0936 \u0915\u0930\n\u092e\u093f\u0932 \u091c\u093e\u090f \u0924\u0941\u091d \u0915\u094b \u0926\u0930\u093f\u092f\u093e \u0924\u094b \u0938\u092e\u0902\u0926\u0930 \u0924\u0932\u093e\u0936 \u0915\u0930",
        author: "\u0905\u0932\u094d\u0932\u093e\u092e\u093e \u0907\u0915\u093c\u092c\u093e\u0932",
        summary: "Never settle at any destination; if you discover a river, set out in search of an ocean."
      },
      {
        id: 31,
        category: "Hindi Shayari",
        theme: "rose",
        title: "Courage",
        tagline: "Internal Fortitude",
        quote: "\u0939\u094c\u0938\u0932\u0947 \u092d\u0940 \u0915\u093f\u0938\u0940 \u0939\u0915\u0940\u092e \u0938\u0947 \u0915\u092e \u0928\u0939\u0940\u0902 \u0939\u094b\u0924\u0947\n\u0939\u0930 \u0924\u0915\u0932\u0940\u092b\u093c \u092e\u0947\u0902 \u0924\u093e\u0915\u0924 \u0915\u0940 \u0926\u0935\u093e \u0926\u0947\u0924\u0947 \u0939\u0948\u0902",
        author: "\u0905\u091c\u094d\u091e\u093e\u0924",
        summary: "Courage is no less than a physician; in every hardship, it dispenses the medicine of strength."
      },
      {
        id: 32,
        category: "Urdu Shayari",
        theme: "purple",
        title: "Allama Iqbal",
        tagline: "Selfhood (Khudi)",
        quote: "\u0916\u0941\u0926\u0940 \u0915\u094b \u0915\u0930 \u092c\u0941\u0932\u0902\u0926 \u0907\u0924\u0928\u093e \u0915\u093f \u0939\u0930 \u0924\u0915\u093c\u0926\u0940\u0930 \u0938\u0947 \u092a\u0939\u0932\u0947\n\u0916\u093c\u0941\u0926\u093e \u092c\u0902\u0926\u0947 \u0938\u0947 \u0916\u093c\u0941\u0926 \u092a\u0942\u091b\u0947 \u092c\u0924\u093e \u0924\u0947\u0930\u0940 \u0930\u091c\u093c\u093e \u0915\u094d\u092f\u093e \u0939\u0948",
        author: "\u0905\u0932\u094d\u0932\u093e\u092e\u093e \u0907\u0915\u093c\u092c\u093e\u0932",
        summary: "Elevate your character so high that before writing your destiny, God Himself asks what you desire."
      },
      {
        id: 33,
        category: "Stoicism",
        theme: "cyan",
        title: "Marcus Aurelius",
        tagline: "Meditations",
        quote: "Waste no more time arguing what a good man should be. Be one.",
        author: "Marcus Aurelius",
        summary: "Action and virtue supersede endless philosophical debate. Embody greatness right now."
      },
      {
        id: 34,
        category: "Philosophy",
        theme: "violet",
        title: "Friedrich Nietzsche",
        tagline: "Twilight of the Idols",
        quote: "He who has a why to live can bear almost any how.",
        author: "Friedrich Nietzsche",
        summary: "A clear, compelling purpose provides endurance through any conceivable adversity."
      },
      {
        id: 35,
        category: "Stoicism",
        theme: "blue",
        title: "Seneca",
        tagline: "Letters from a Stoic",
        quote: "We suffer more often in imagination than in reality.",
        author: "Seneca",
        summary: "Anxiety exaggerates threats; ground your mind in the present facts rather than anticipated fears."
      },
      {
        id: 36,
        category: "Stoicism",
        theme: "teal",
        title: "Marcus Aurelius",
        tagline: "Inner Citadel",
        quote: "It is not death that a man should fear, but he should fear never beginning to live.",
        author: "Marcus Aurelius",
        summary: "The ultimate tragedy is a life unexamined, unlived, and squandered in safe stagnation."
      },
      {
        id: 37,
        category: "Eastern Philosophy",
        theme: "emerald",
        title: "Lao Tzu",
        tagline: "Tao Te Ching",
        quote: "The journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
        summary: "Monumental undertakings are achieved through steady, relentless individual actions."
      },
      {
        id: 38,
        category: "Stoicism",
        theme: "indigo",
        title: "Marcus Aurelius",
        tagline: "Mental Sovereignty",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        summary: "Internal mastery is the only true fortress against external chaos."
      },
      {
        id: 39,
        category: "Stoicism",
        theme: "amber",
        title: "Epictetus",
        tagline: "Discourses",
        quote: "Don't explain your philosophy. Embody it.",
        author: "Epictetus",
        summary: "Let your habits and demeanor communicate your values, not your speeches."
      },
      {
        id: 40,
        category: "Stoicism",
        theme: "coral",
        title: "Stoic Axiom",
        tagline: "The Obstacle Is The Way",
        quote: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        summary: "What stands in the path becomes the catalyst for growth and breakthroughs."
      },
      {
        id: 41,
        category: "Wisdom",
        theme: "cyan",
        title: "Lao Tzu",
        tagline: "Quiet Power",
        quote: "Silence is a source of great strength.",
        author: "Lao Tzu",
        summary: "Measured restraint reveals clarity and protects internal reserves."
      },
      {
        id: 42,
        category: "Leadership",
        theme: "gold",
        title: "Winston Churchill",
        tagline: "Perseverance",
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        summary: "Outcomes are transitory; resilient commitment to the process defines life."
      },
      {
        id: 43,
        category: "Science & Mind",
        theme: "purple",
        title: "Albert Einstein",
        tagline: "Creative Insight",
        quote: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        summary: "Every breakdown contains the seeds of a breakthrough for those who look closely."
      },
      {
        id: 44,
        category: "Psychology",
        theme: "emerald",
        title: "Viktor E. Frankl",
        tagline: "Man's Search for Meaning",
        quote: "Everything can be taken from a man but one thing: the last of human freedoms\u2014to choose one's attitude in any set of circumstances.",
        author: "Viktor E. Frankl",
        summary: "Even in the darkest despair, the sovereignty over your reaction remains yours."
      },
      {
        id: 45,
        category: "Philosophy",
        theme: "orange",
        title: "Aristotle",
        tagline: "Nicomachean Ethics",
        quote: "Knowing yourself is the beginning of all wisdom.",
        author: "Aristotle",
        summary: "Self-awareness is the bedrock upon which all practical intelligence is founded."
      },
      {
        id: 46,
        category: "Literature",
        theme: "rose",
        title: "Ralph Waldo Emerson",
        tagline: "Self-Reliance",
        quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson",
        summary: "Pioneer your own territory rather than treading well-worn footprints."
      },
      {
        id: 47,
        category: "Stoicism",
        theme: "blue",
        title: "Marcus Aurelius",
        tagline: "Moral Dignity",
        quote: "The best revenge is not to be like that.",
        author: "Marcus Aurelius",
        summary: "Refuse to let malicious people drag your character down into their pettiness."
      },
      {
        id: 48,
        category: "Psychology",
        theme: "violet",
        title: "Viktor E. Frankl",
        tagline: "Transformation",
        quote: "When we are no longer able to change a situation, we are challenged to change ourselves.",
        author: "Viktor E. Frankl",
        summary: "When outward reality is immovable, inner transformation becomes imperative."
      },
      {
        id: 49,
        category: "Art & Design",
        theme: "teal",
        title: "Leonardo da Vinci",
        tagline: "Elegance",
        quote: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci",
        summary: "Distilling complexity into elegant clarity is the highest form of mastery."
      },
      {
        id: 50,
        category: "Courage",
        theme: "emerald",
        title: "Nelson Mandela",
        tagline: "Long Walk to Freedom",
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        summary: "Perceived barriers vanish the moment relentless action carries you across the finish line."
      },
      {
        id: 51,
        category: "Innovation",
        theme: "cyan",
        title: "Steve Jobs",
        tagline: "Stanford Address",
        quote: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        summary: "Authenticity and courage of conviction must guide your irreplaceable days."
      },
      {
        id: 52,
        category: "Eastern Philosophy",
        theme: "gold",
        title: "Dhammapada",
        tagline: "Mindfulness",
        quote: "The mind is everything. What you think you become.",
        author: "Buddha",
        summary: "Your thoughts sculpt your beliefs, your habits, and ultimately your reality."
      },
      {
        id: 53,
        category: "Action",
        theme: "orange",
        title: "Theodore Roosevelt",
        tagline: "Resourcefulness",
        quote: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
        summary: "Perfectionism is paralysis; begin with immediate resources right now."
      },
      {
        id: 54,
        category: "Poetry & Song",
        theme: "rose",
        title: "John Lennon",
        tagline: "Beautiful Boy",
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        summary: "Cherish the present moment; reality exists only here and now."
      }
    ]
  }

};

