// Small illustrative "mockup" objects built in CSS. They stand in for imagery without
// pretending to be client work (brand rule 1). Used by the hero, cards and previews.

export function BrandBoard() {
  return (
    <div className="v v-brand" aria-hidden="true">
      <div className="v-brand__mark">
        <img src="/brand/ntb-mark-cream.png" alt="" />
      </div>
      <div className="v-brand__side">
        <span className="v-brand__label">Brand system</span>
        <div className="v-brand__swatches">
          <i style={{ background: '#6C6847' }} />
          <i style={{ background: '#F1E6D8' }} />
          <i style={{ background: '#EE7A55' }} />
          <i style={{ background: '#222423' }} />
        </div>
        <span className="v-brand__type">Aa</span>
      </div>
    </div>
  );
}

export function Reel() {
  return (
    <div className="v v-reel" aria-hidden="true">
      <div className="v-reel__screen">
        <span className="v-reel__time">00:15</span>
        <span className="v-reel__play" />
        <span className="v-reel__cap">Reel concept · Draft</span>
      </div>
    </div>
  );
}

export function CreatorChip() {
  return (
    <div className="v v-creator" aria-hidden="true">
      <div className="v-creator__row">
        <span className="v-creator__avatar" />
        <div>
          <b>Creator shortlist</b>
          <small>Lifestyle · 3 matches</small>
        </div>
      </div>
      <div className="v-creator__tags">
        <span>UGC</span>
        <span>Reels</span>
        <span>Brief sent</span>
      </div>
    </div>
  );
}

export function ChatAgent() {
  return (
    <div className="v v-chat" aria-hidden="true">
      <span className="v-chat__msg v-chat__msg--in">Is the queen size in stock?</span>
      <span className="v-chat__msg v-chat__msg--out">Yes, 4 left. Delivery to Pune in 3 days. Want me to reserve one?</span>
      <span className="v-chat__typing">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function MiniDash() {
  const bars = [38, 62, 45, 80, 56, 92, 70];
  return (
    <div className="v v-dash" aria-hidden="true">
      <div className="v-dash__head">
        <span>Weekly report</span>
        <span className="v-dash__live">Auto</span>
      </div>
      <div className="v-dash__bars">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function FlowNode() {
  return (
    <div className="v v-node" aria-hidden="true">
      <span className="v-node__kind">AI step</span>
      <b>Qualify lead</b>
      <small>score · summarise · route</small>
    </div>
  );
}

export const VISUALS = { brand: BrandBoard, reel: Reel, creator: CreatorChip, chat: ChatAgent, dash: MiniDash, node: FlowNode };

export function Visual({ name }) {
  const C = VISUALS[name] ?? BrandBoard;
  return <C />;
}
