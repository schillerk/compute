import React, { Component } from 'react';

import Calculator from './Calculator';
import Timeline from './Timeline';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="header__title">
            AI and Compute 2.0
          </div>
        </div>
        <div className="paragraph">
          Since 2012, the amount of compute used in the largest AI training runs has grown exponentially with a 3.5 month doubling time. By comparison, Moore’s Law had an 18-month doubling time.
        </div>
        <Timeline />
        <div className="paragraph">
          What do exponential increases in compute mean for the future of AI?
        </div>
        <div className="paragraph">
          The optimistic interpretation is that AI has consistently gotten better, and will continue to do so well into the future. By enabling improvements to current methods alongside the development of entirely new ones, compute will allow for sustained growth. Or as OpenAI states unambiguously, since “more compute leads to predictably better performance… It’s worth preparing for the implication of systems far outside today’s capabilities.”
        </div>
        <div className="paragraph">
          Still, there are valid concerns about how long the trend can be maintained.
        </div>
        <div className="paragraph">
          Exponential growth in compute means an exponential increase in the cost of training and serving AI models.
        </div>
        <div className="paragraph">
          AlphaGo Zero, for example, trained on $35M of hardware. If the current trend continues, and compute grows by another 300,000x in the next 5 years, a similar experiment in 2023 would have a cost in the trillions, making this kind of cutting-edge research prohibitively expensive.
        </div>
        <div className="paragraph">
          Of course, the cost of compute itself is improving alongside AI’s needs, and could help offset some of these costs. In addition to Google’s TPU, a number of hardware startups are flocking to the space in hopes of developing AI-specific chips.
        </div>
        <Calculator />
        <div className="paragraph">
          This gives us a rough estimate of the cost of compute for the largest AI models over time, but there are still more factors involved if we want to more directly interrogate some key points of concern.
        </div>
        <div className="paragraph">
          Global GDP is at about 87 trillion currently, and projected to grow at about 6% / year, or at a doubling time of 12 years. This growth alone won’t have a huge impact relative to the historical trend of compute growth, with only 1% of the global GDP currently allocated for hardware, there’s still room for increased investment.
        </div>
        <div className="paragraph">
          More speculatively, progress in AI could accelerate the growth of global GDP itself, and make more resources available for compute. Similarly, we might imagine the doubling time of FLOPS/$ outpacing current trends if AI could be leveraged to improve it’s own hardware.
        </div>
      </div>
    );
  }
}

export default App;
