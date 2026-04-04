---
layout: base.njk
title: Contact & Book
permalink: /contact/
---

<div class="page-hero">
  <p class="section-label">Get in Touch</p>
  <h1>Let's Start the <em>Conversation</em></h1>
  <p>Reaching out is often the hardest part. I offer a free 15-minute introductory call so we can explore whether we're a good fit — with no obligation to continue.</p>
</div>

<section>
  <div class="contact-grid">
    <div class="fade-in">
      <p class="section-label">Contact Details</p>
      <h2 class="section-title" style="font-size:2rem; margin-bottom:3rem;">I'd Love to <em>Hear from You</em></h2>

      <div class="contact-detail">
        <h3>Email</h3>
        <p>The best way to reach me. I aim to respond within 24 hours on working days.</p>
        <p><a href="mailto:contact@sophieklose.com">contact@sophieklose.com</a></p>
      </div>

      <div class="contact-detail">
        <h3>Location</h3>
        <p>In-person sessions are available in </p>
        <p style="color:var(--charcoal); margin-top:0.25rem;">Lavaterstrasse 79, 8002 Zurich, Switzerland</p>
      </div>

      <div class="contact-detail">
        <h3>Online Sessions</h3>
        <p>Online counselling is available worldwide via secure video call, in English or French.</p>
      </div>

      <div class="contact-detail">
        <h3>Session Fees</h3>
        <p>Please get in touch to enquire about current fees and session availability. I aim to make counselling as accessible as possible and am happy to discuss your circumstances.</p>
      </div>

      <div class="contact-detail" style="border-bottom:none; padding-bottom:0;">
        <h3>Languages</h3>
        <p>Sessions available in <strong>English</strong> and <strong>French</strong>.<br />
        Séances disponibles en anglais et en français.</p>
      </div>
    </div>

    <div class="fade-in">
      <div class="contact-form-wrap">
        <h3>Send a Message</h3>
        <form id="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <p style="display:none"><label>Don't fill this: <input name="bot-field" /></label></p>
          <input type="hidden" name="subject" value="New message from %{formName}" />
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" required placeholder="First and Lastname" />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label for="language">Preferred Language</label>
            <select id="language" name="language">
              <option value="">Select a language</option>
              <option value="English">English</option>
              <option value="French">French / Français</option>
            </select>
          </div>
          <div class="form-group">
            <label for="format">Session Format</label>
            <select id="format" name="format">
              <option value="">Select a format</option>
              <option value="In-person Zurich">In-person (Zurich)</option>
              <option value="Online">Online (video call)</option>
              <option value="Unsure">I'm not sure yet</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">What brings you here? <span style="font-size:0.68rem; color:var(--sage);">(optional)</span></label>
            <textarea id="message" name="message" placeholder="A brief description of what you're hoping to explore in counselling — or simply let me know you'd like to chat."></textarea>
          </div>
          <button type="submit" class="form-submit">Send Message</button>
          <div id="form-status" class="form-status" style="display:none;"></div>
        </form>
        <p style="font-size:0.75rem; color:var(--mid-grey); margin-top:1.5rem; line-height:1.7;">All enquiries are treated with complete confidentiality. By sending this message, you consent to your details being used to respond to your enquiry.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section style="background:var(--cream);">
  <p class="section-label fade-in">Frequently Asked</p>
  <h2 class="section-title fade-in">Questions You <em>Might Have</em></h2>
  <div class="two-col fade-in" style="margin-top:3rem; gap:3rem;">
    <div class="prose">
      <h2>How long are sessions?</h2>
      <p>Standard sessions are 50 minutes. Longer sessions can sometimes be arranged — please get in touch to discuss.</p>

      <h2>How often will we meet?</h2>
      <p>Most clients begin with weekly sessions, which helps build momentum and continuity. As you progress, we may move to fortnightly sessions. The frequency is always determined by your needs and we review it together regularly.</p>

      <h2>How many sessions will I need?</h2>
      <p>This varies enormously from person to person and depends on what you're bringing to counselling. Some people benefit from a focused short-term engagement (6–12 sessions); others prefer longer-term support. There's no pressure — we go at your pace.</p>
    </div>
    <div class="prose">
      <h2>Is counselling confidential?</h2>
      <p>Yes, fully. Everything discussed in sessions is confidential, except in very limited circumstances where I have a legal or ethical duty of care. I will always explain these limits clearly at the outset.</p>

      <h2>Do you offer a free consultation?</h2>
      <p>Yes. I offer a free 15-minute introductory call so we can get a sense of each other and you can ask any questions you have before committing to sessions.</p>

      <h2>Can I switch between French and English?</h2>
      <p>Absolutely. Many of my clients find it natural to move between languages depending on the topic. You're welcome to use whichever language feels most authentic in any given moment.</p>
    </div>
  </div>
</section>
