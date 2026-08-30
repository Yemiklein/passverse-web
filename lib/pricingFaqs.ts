export interface PricingFaq {
  q: string;
  a: string;
}

/** Shared by the pricing page UI and its FAQPage structured data. */
export const PRICING_FAQS: PricingFaq[] = [
  {
    q: 'How do I pay for Premium?',
    a: "Payment is processed securely through Paystack — Nigeria's leading payment platform. You can pay with card, bank transfer, or USSD. Your subscription activates immediately after payment.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes — email support@passverse.com.ng and we'll cancel within 24 hours. You keep premium access until the end of your billing period. No partial refunds.",
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your progress, streaks, XP and badges are saved forever. You simply lose access to premium features but keep your free plan access.',
  },
  {
    q: 'Is there a student discount?',
    a: "The yearly plan at ₦12,000 is already our best value — that's less than ₦33 per day. We believe quality exam prep should be accessible to every Nigerian student.",
  },
  {
    q: 'Do you offer school or bulk pricing?',
    a: 'Yes — we offer special pricing for lesson centres and schools. Email schools@passverse.com.ng for details.',
  },
  {
    q: 'What if I have payment issues?',
    a: "Email support@passverse.com.ng with your payment reference and we'll resolve it within 24 hours.",
  },
];
