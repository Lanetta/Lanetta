import { Router, type IRouter } from "express";
import { GetRegulationGuideResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/regulation-guide", (_req, res) => {
  const guide = GetRegulationGuideResponse.parse({
    title: "Self-Regulation & Clarity",
    introduction:
      "A guide to how awareness, nervous-system states, and emotional capacity work together. Use it to learn the ideas, not to diagnose yourself.",
    center:
      "A state where your nervous system is settled enough to think clearly, feel safely, and act with intention. Presence, emotional balance, and flexible behavior become more possible.",
    frameworks: [
      {
        id: "window-of-tolerance",
        name: "Window of Tolerance",
        originator: "Dan Siegel",
        summary:
          "The optimal arousal zone where you can stay grounded, responsive, and steady.",
        keyIdeas: [
          "Inside the window, you can handle stress without becoming overwhelmed or shutting down.",
          "The window can widen gradually while respecting your limits.",
        ],
      },
      {
        id: "polyvagal-theory",
        name: "Polyvagal Theory",
        originator: "Stephen Porges",
        summary:
          "A framework for noticing nervous-system states associated with safety and connection, mobilization, or shutdown.",
        keyIdeas: [
          "Ventral vagal: safety, connection, calm, and openness.",
          "Sympathetic: fight-or-flight activation and mobilization.",
          "Dorsal vagal: shutdown, collapse, numbness, or withdrawal.",
        ],
      },
      {
        id: "mindfulness",
        name: "Mindfulness",
        originator: "Practice",
        summary:
          "Awareness and presence that help you observe your internal state without judgment.",
        keyIdeas: [
          "Notice when you may be moving outside your window of tolerance.",
          "Use awareness to support a gentle return to the present.",
        ],
      },
    ],
    nervousSystemStates: [
      {
        id: "ventral-vagal",
        name: "Safety & connection",
        description:
          "Calm, social, open, and regulated — the ventral vagal state described in the source.",
        signals: ["Calm", "Connected", "Open", "Regulated"],
      },
      {
        id: "sympathetic",
        name: "Fight or flight",
        description:
          "Activated and mobilized, which may feel anxious or tense.",
        signals: ["Activated", "Mobilized", "Anxious", "Tense"],
      },
      {
        id: "dorsal-vagal",
        name: "Shutdown",
        description:
          "A withdrawn or overwhelmed state that may feel collapsed or numb.",
        signals: ["Collapsed", "Numb", "Withdrawn", "Overwhelmed"],
      },
    ],
    returningPractices: [
      {
        id: "slow-breathing",
        name: "Slow breathing",
        description:
          "Slow the breath, especially by allowing the exhale to last longer.",
      },
      {
        id: "five-senses-grounding",
        name: "Ground through your senses",
        description:
          "Try a 5–4–3–2–1 check-in with the senses to reconnect with the present.",
      },
      {
        id: "gentle-movement",
        name: "Move gently",
        description: "Try gentle movement or stretching.",
      },
      {
        id: "orienting",
        name: "Orient to your surroundings",
        description: "Look around and name what you see.",
      },
      {
        id: "warm-self-talk",
        name: "Use reassuring self-talk",
        description:
          "Offer yourself words that are warm, simple, and reassuring.",
      },
      {
        id: "safe-connection",
        name: "Connect with someone safe",
        description: "Reach out to a person with whom you feel safe.",
      },
      {
        id: "pause",
        name: "Pause instead of pushing through",
        description: "Give yourself permission to pause.",
      },
    ],
    wellbeingPrinciples: [
      "Build daily micro-moments of regulation with short pauses, breaths, and check-ins.",
      "Support connection, rhythm, and breath in everyday life.",
      "Practice mindfulness in small, doable doses.",
      "Respect your limits and widen your window gradually.",
      "Treat dysregulation as information, not failure.",
    ],
  });

  res.json(guide);
});

export default router;
