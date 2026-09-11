import agenticAi from "#/assets/aws/agentic-ai.svg";
import bedrock from "#/assets/aws/bedrock.svg";
import lex from "#/assets/aws/lex.svg";
import quickSuite from "#/assets/aws/quick-suite.svg";
import rds from "#/assets/aws/rds.svg";
import sagemaker from "#/assets/aws/sagemaker.svg";

export type AwsService = {
  readonly description: string;
  readonly icon: string;
  readonly name: string;
  /** Keys the accent colour taken from the official icon (see styles.css). */
  readonly slug: string;
  /** Where the oversized logo sits in the backdrop, so each service reads differently. */
  readonly spot: string;
};

export const AwsServices: readonly AwsService[] = [
  {
    description:
      "Optimize the total cost of ownership by automating database management tasks like provisioning and patching. Enjoy rapid deployment, built-in security features, and cost-effective pricing based on actual usage.",
    icon: rds,
    name: "Amazon RDS",
    slug: "rds",
    spot: "-top-[14%] -right-[12%] h-[128%]",
  },
  {
    description:
      "Turn your data into interactive dashboards and visual insights for better decision-making, making it easier to understand performance and share reports across your team.",
    icon: quickSuite,
    name: "Amazon Quick Suite",
    slug: "quick-suite",
    spot: "-bottom-[18%] -right-[16%] h-[120%]",
  },
  {
    description:
      "Build and scale generative AI applications using foundation models without managing infrastructure, while keeping your data secure and maintaining full control over how AI is applied.",
    icon: bedrock,
    name: "Amazon Bedrock",
    slug: "bedrock",
    spot: "-top-[10%] -right-[6%] h-[134%]",
  },
  {
    description:
      "Design intelligent systems that can take actions and automate complex workflows, allowing processes to run more efficiently with minimal human input.",
    icon: agenticAi,
    name: "Agentic AI",
    slug: "agentic-ai",
    spot: "-bottom-[12%] -right-[22%] h-[140%]",
  },
  {
    description:
      "Create conversational interfaces using voice and text with natural language understanding, enabling chatbots and assistants that handle user interactions smoothly.",
    icon: lex,
    name: "Amazon Lex",
    slug: "lex",
    spot: "-top-[4%] -right-[8%] h-[116%]",
  },
  {
    description:
      "Build, train, and deploy machine learning models on a fully managed platform, simplifying the journey from raw data to production-ready systems.",
    icon: sagemaker,
    name: "Amazon SageMaker",
    slug: "sagemaker",
    spot: "-top-[20%] -right-[2%] h-[146%]",
  },
];
