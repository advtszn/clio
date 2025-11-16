import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Upload,
  FileText,
  Brain,
  Stethoscope,
  Sparkles,
  Lock,
  Plug,
} from "~/components/ui/icons";
import NoiseWrapper from "~/components/common/noise-wrapper";
import AuthDialog from "~/components/auth/auth-dialog";
import HomeNavbar from "~/components/home/navbar";
import Footer from "~/components/home/footer";
import GetStarted from "~/components/home/get-started";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col font-sans">
      <NoiseWrapper>
        {/* Header */}
        <HomeNavbar />

        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="container mx-auto px-4 py-16 md:px-6 ">
            <div className="max-w-3xl">
              <Badge className="mb-4 inline-flex gap-1  border">
                <Sparkles className="size-3.5" /> AI-native medical memory
              </Badge>
              <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight md:text-6xl">
                End medical data chaos with Contextual Medical Memory
              </h1>
              <p className="text-muted-foreground mt-6 text-lg md:text-xl">
                Clio ingests your scattered medical documents &mdash; labs,
                notes, portals, claims &mdash; and transforms them into a
                secure, structured, queryable memory that works across patients,
                doctors, and insurers.
              </p>
              <div className="mt-8 ">
                <GetStarted />
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div className="text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4" /> Consent-first sharing
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Brain className="size-4" /> Context-aware answers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section
          id="problem"
          className="container mx-auto px-4 py-16 md:px-6 md:py-24"
        >
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <Card className=" border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="size-5" /> The problem: chaotic medical
                  documents
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Patients juggle PDFs, portal messages, imaging CDs, and
                  claims. Doctors re-enter history. Insurers request the same
                  records repeatedly.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Unstructured documents locked in disparate portals</li>
                  <li>Duplicated data entry and missing context</li>
                  <li>Slow decisions, denied claims, and clinician burnout</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="solution" className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="size-5" /> The solution: Contextual Medical
                  Memory (CMM)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Clio converts messy files into a longitudinal, structured
                  medical memory. Every data point is normalized, linked to
                  source, and instantly queryable.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Automatic ingestion and normalization of labs, notes,
                    imaging
                  </li>
                  <li>Source-backed facts with provenance and timelines</li>
                  <li>
                    Natural language queries: "What changed since last visit?"
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bento Features */}
        <section id="features" className="border-y">
          <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                What you can do with Clio
              </h2>
              <p className="text-muted-foreground mt-3">
                Monochrome, focused, and fast. A single surface connecting
                patients, providers, and payers.
              </p>
            </div>

            <div className="grid auto-rows-[160px] grid-cols-1 border md:grid-cols-6">
              {/* Tile 1 - Patient uploads */}
              <div className="col-span-3 row-span-2 flex flex-col justify-between border p-6 md:col-span-3">
                <h3 className=" font-semibold  flex items-center gap-2 text-2xl ">
                  <Upload size={20} /> Patient uploads
                </h3>
                <p className="text-muted-foreground font-medium">
                  Drag-and-drop any file. We extract contexualize everything.
                </p>
              </div>

              {/* Tile 2 - Doctor onboarding */}
              <div className="col-span-3 row-span-2 flex flex-col justify-between border p-6 md:col-span-3">
                <h3 className=" font-semibold flex items-center gap-2 text-2xl ">
                  <Stethoscope size={20} /> Doctor onboarding
                </h3>
                <p className="text-muted-foreground font-medium">
                  Invite providers with patient consent. No fax. No portal
                  lock-in.
                </p>
              </div>

              {/* Tile 5 - Web portal */}
              <div className="col-span-2 row-span-2 flex flex-col justify-between border p-6 md:col-span-2">
                <h3 className=" font-semibold flex items-center gap-2 text-2xl">
                  <Sparkles size={20} /> Web portal
                </h3>
                <p className="text-muted-foreground font-medium">
                  Search, filter, and chat with your medical memory. Export
                  clean summaries.
                </p>
              </div>

              {/* Tile 4 - Security */}
              <div className="col-span-2 row-span-2 flex flex-col justify-between border p-6 md:col-span-2">
                <h3 className=" font-semibold flex items-center gap-2 text-2xl">
                  <ShieldCheck size={20} /> Security
                </h3>
                <p className="text-muted-foreground font-medium">
                  HIPAA-grade encryption, consent-backed sharing.
                </p>
              </div>

              {/* Tile 3 - Insurer & MCP access */}
              <div className="col-span-2 row-span-2 flex flex-col justify-between border p-6 md:col-span-2">
                <h3 className=" font-semibold  flex items-center gap-2 text-2xl">
                  <Plug size={20} /> MCP access
                </h3>
                <p className="text-muted-foreground font-medium">
                  Access your medical data from any LLM, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section
          id="use-cases"
          className="container mx-auto px-4 py-16 md:px-6 md:py-24"
        >
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Use cases
            </h2>
            <p className="text-muted-foreground mt-3">
              Designed for each stakeholder with a single source of truth.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className=" border p-6">
              <h3 className=" text-lg font-semibold">Patients</h3>
              <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Consolidate labs, notes, imaging, and bills</li>
                <li>Generate a clean medical history on demand</li>
                <li>Share time-boxed links with doctors and insurers</li>
              </ul>
            </div>
            <div className=" border p-6">
              <h3 className=" stext-lg font-semibold">Doctors</h3>
              <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Intake in minutes with structured summaries</li>
                <li>Timeline diffs: what changed since last visit</li>
                <li>Attach source-backed evidence to decisions</li>
              </ul>
            </div>
            <div className=" border p-6">
              <h3 className="  text-lg font-semibold">Insurers</h3>
              <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Query medical necessity with provenance</li>
                <li>Reduce rework and denials via structured data</li>
                <li>Full audit trails for consent and access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </NoiseWrapper>
    </div>
  );
}
