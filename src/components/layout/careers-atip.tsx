import {useState} from "react";
import {Award, CheckCircle, GraduationCap, Users} from "lucide-react";

const SECTION_TITLE_ID = "atip-program-title";

function AtipHighlights() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-[#062413] to-[#020d06] p-8 text-left sm:p-10">
      <div>
        <div className="flex size-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3">
          <GraduationCap className="size-8 text-emerald-400" aria-hidden="true" />
        </div>

        <h3 className="mt-6 text-2xl font-medium tracking-tight text-white sm:text-3xl">Internship Highlights</h3>

        <ul className="mt-6 space-y-4 text-sm text-white/80 sm:text-base">
          <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>
              <strong>Real AWS Cloud Sandbox:</strong> Hands-on experience configuring VPCs, RDS, ECS, and Serverless workloads.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Award className="mt-1 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>
              <strong>AWS Certification Sponsorship:</strong> Full exam voucher coverage for top-performing candidates.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Users className="mt-1 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>
              <strong>1-on-1 Senior Mentorship:</strong> Direct guidance from certified AWS Solutions Architects.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <p className="text-xs leading-relaxed text-white/70">
          Cohort 2026 application window is currently open. Candidates are selected based on problem-solving ability and cloud passion.
        </p>
      </div>
    </div>
  );
}

function AtipSuccessMessage({email}: {readonly email: string}) {
  return (
    <div className="my-auto py-12 text-center space-y-4">
      <CheckCircle className="mx-auto size-16 text-emerald-400" />
      <h3 className="text-2xl font-medium text-white">Application Submitted Successfully!</h3>
      <p className="text-sm text-white/70">
        Thank you for applying to ATIP. Our team will review your submission and contact you via <strong>{email}</strong>.
      </p>
    </div>
  );
}

type AtipFormFieldsProps = {
  readonly fullName: string;
  readonly email: string;
  readonly track: string;
  readonly onFullNameChange: (val: string) => void;
  readonly onEmailChange: (val: string) => void;
  readonly onTrackChange: (val: string) => void;
};

function AtipFormFields({fullName, email, track, onFullNameChange, onEmailChange, onTrackChange}: AtipFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Enter your full name"
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@domain.com"
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="track" className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
          Area of Interest
        </label>
        <select
          id="track"
          value={track}
          onChange={(e) => onTrackChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a1a10] px-4 py-3.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
        >
          <option value="Cloud Architecture">Cloud Architecture & Infrastructure</option>
          <option value="DevOps & Automation">DevOps & Automation Pipelines</option>
          <option value="Cloud Security">Cloud Security & Compliance</option>
          <option value="Fullstack Development">Fullstack Cloud Applications</option>
        </select>
      </div>
    </div>
  );
}

function AtipForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("Cloud Architecture");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return <AtipSuccessMessage email={email} />;
  }

  return (
    <form id="atip-form" onSubmit={handleSubmit} className="space-y-6">
      <AtipFormFields
        fullName={fullName}
        email={email}
        track={track}
        onFullNameChange={setFullName}
        onEmailChange={setEmail}
        onTrackChange={setTrack}
      />
      <button
        type="submit"
        className="w-full rounded-full bg-emerald-400 py-3.5 text-center text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/20"
      >
        Submit Application
      </button>
    </form>
  );
}

export function CareersAtip() {
  return (
    <section
      id="atip-program"
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden bg-[#020905] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id={SECTION_TITLE_ID} className="text-3xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Arthurite Tech Internship Program (ATIP)
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Grow your skills with real projects, mentorship, and hands-on cloud experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#041209]/80 p-8 backdrop-blur-xl sm:p-10">
            <AtipForm />
          </div>
          <AtipHighlights />
        </div>
      </div>
    </section>
  );
}
