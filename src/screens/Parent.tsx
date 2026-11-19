/** Parent corner (behind the parent gate): progress, strengths, settings, reset. */
import { useState } from "react";
import { useStore, resetProgress } from "../state";
import { ACTIVITIES } from "../content/activities";
import { WORLDS } from "../content/worlds";
import { learnerLevel, skillReport, totalStars } from "../engine/progress";
import { LANGS } from "../i18n";
import { Icon } from "../ui/Icon";
import { Modal, Stars } from "../ui/Common";
import { href } from "../router";
import { promptInstall, isStandalone } from "../platform/pwa";
import type { Settings } from "../engine/progress";
import { IN_HUB } from "../platform/native";

export function Parent() {
  const { p, update, t, toast, pwa } = useStore();
  const [confirm, setConfirm] = useState(false);
  const stars = totalStars(p);
  const lv = learnerLevel(stars);
  const rep = skillReport(p);
  const ms = p.log.reduce((s, l) => s + l.ms, 0);
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => update((x) => ({ ...x, settings: { ...x.settings, [k]: v } }));
  const Toggle = ({ k, label }: { k: "voice" | "sfx" | "music" | "bigText"; label: string }) => (
    <label className="row toggle">
      <span>{t(label)}</span>
      <input type="checkbox" role="switch" checked={p.settings[k]} onChange={(e) => set(k, e.target.checked)} />
      <i aria-hidden="true" />
    </label>
  );
  return (
    <div className="page parent">
      <header className="topbar">
        <a className="icon-btn" href={href({ name: "home" })} aria-label={t("nav.back")}><Icon name="back" /></a>
        <div className="grow"><h1>{t("parent.title")}</h1></div>
      </header>
      <p className="parent-intro">{t("parent.intro")}</p>

      <div className="parent-grid">
        <section className="card pcard-sec">
          <h2>{t("parent.overview")}</h2>
          <div className="stats">
            <div><b>{lv.level}</b><small>{t("parent.level")}</small></div>
            <div><b>{stars}</b><small>{t("rw.stars")}</small></div>
            <div><b>{p.log.length}</b><small>{t("parent.played")}</small></div>
            <div><b>{Math.round(ms / 60000)}</b><small>{t("parent.time")} ({t({ k: "parent.minutes", p: { n: "" } }).trim()})</small></div>
          </div>
          <h3>{t("parent.strengths")}</h3>
          {rep.strong.length ? <ul className="tags good">{rep.strong.map((s) => <li key={s}>✓ {t("skill." + s)}</li>)}</ul> : <p className="muted">{t("parent.none")}</p>}
          <h3>{t("parent.practice")}</h3>
          {rep.practice.length ? <ul className="tags practice">{rep.practice.map((s) => <li key={s}>↻ {t("skill." + s)}</li>)}</ul> : <p className="muted">{t("parent.none")}</p>}
        </section>

        <section className="card pcard-sec">
          <h2>{t("parent.settings")}</h2>
          <div className="row">
            <span>{t("parent.lang")}</span>
            <div className="seg">
              {LANGS.map((l) => (
                <button key={l.id} className={p.settings.lang === l.id ? "on" : ""} onClick={() => set("lang", l.id)} aria-pressed={p.settings.lang === l.id}>{l.label}</button>
              ))}
            </div>
          </div>
          <Toggle k="voice" label="parent.voice" />
          <Toggle k="sfx" label="parent.sfx" />
          <Toggle k="music" label="parent.music" />
          <Toggle k="bigText" label="parent.bigText" />
          <div className="row">
            <span>{t("parent.theme")}</span>
            <div className="seg">
              {(["auto", "light", "dark"] as const).map((m) => (
                <button key={m} className={p.settings.theme === m ? "on" : ""} onClick={() => set("theme", m)} aria-pressed={p.settings.theme === m}>{t("parent.theme." + m)}</button>
              ))}
            </div>
          </div>
          {!IN_HUB && !isStandalone() && (
            <div className="row">
              <span>{t("parent.install")}<br /><small className="muted">{t("parent.installHow")}</small></span>
              {pwa.canInstall && <button className="btn small" onClick={() => promptInstall()}><Icon name="download" size={22} /></button>}
            </div>
          )}
          {pwa.offlineReady && <p className="muted">✓ {t("parent.offline")}</p>}
          <button className="btn small ghost danger" onClick={() => setConfirm(true)}>{t("parent.reset")}</button>
          <p className="muted small">{t({ k: "parent.version", p: { v: __BUILD__ } })}</p>
        </section>
      </div>

      <h2 className="section-title">{t("parent.activities")}</h2>
      <div className="parent-acts">
        {WORLDS.map((w) => (
          <section key={w.id} className="card pcard-sec">
            <h3>{t(w.title)}</h3>
            <table>
              <tbody>
                {ACTIVITIES.filter((a) => a.world === w.id).map((a) => {
                  const ap = p.activities[a.id];
                  return (
                    <tr key={a.id}>
                      <td>
                        <b>{t(a.title)}</b>
                        <small>{t("parent.objective")}: {t(a.goal)}</small>
                      </td>
                      <td className="r">{ap ? <><Stars n={ap.stars} size={16} /><small>×{ap.plays} · L{ap.level}</small></> : <small className="muted">{t("parent.notPlayed")}</small>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      {p.log.length > 0 && (
        <>
          <h2 className="section-title">{t("parent.recent")}</h2>
          <section className="card pcard-sec">
            <table>
              <tbody>
                {p.log.slice(-8).reverse().map((l, i) => {
                  const a = ACTIVITIES.find((x) => x.id === l.id);
                  return (
                    <tr key={i}>
                      <td><b>{a ? t(a.title) : l.id}</b><small>{l.date}</small></td>
                      <td className="r"><Stars n={l.stars} size={16} /><small>{l.c}/{l.n}</small></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </>
      )}

      {confirm && (
        <Modal label={t("parent.reset")} onClose={() => setConfirm(false)}>
          <h2>{t("parent.reset")}</h2>
          <p>{t("parent.resetConfirm")}</p>
          <div className="row-btns">
            <button className="btn ghost" onClick={() => setConfirm(false)}>{t("parent.no")}</button>
            <button className="btn orange" onClick={() => { update((x) => resetProgress(x)); setConfirm(false); toast(t("parent.resetDone")); }}>{t("parent.yes")}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
