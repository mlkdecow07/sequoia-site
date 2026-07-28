const BELIEF_PREFIX = "We believe";

type BeliefStatementProps = {
  belief: string;
};

export default function BeliefStatement({ belief }: BeliefStatementProps) {
  const rest = belief.startsWith(BELIEF_PREFIX)
    ? belief.slice(BELIEF_PREFIX.length).trimStart()
    : belief;

  return (
    <article className="group relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-teal/15 bg-white px-4 py-4 shadow-sm transition duration-200 hover:border-teal/35 hover:shadow-md sm:max-w-lg md:px-5 md:py-5">
      <div
        className="absolute inset-y-0 left-0 w-1 bg-teal/20 transition group-hover:bg-teal"
        aria-hidden="true"
      />
      <p className="type-body m-0 pl-3 md:pl-4">
        <span className="font-heading text-base font-semibold uppercase tracking-wide text-teal md:text-lg">
          We believe
        </span>{" "}
        {rest}
      </p>
    </article>
  );
}
