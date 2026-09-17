import type {ServiceItem} from "#/lib/services-data.ts";

export const SERVICES_BATCH_2: readonly ServiceItem[] = [
  {
    id: "svc-devops",
    slug: "devops-cicd-pipelines",
    title: "DevOps & CI/CD Pipelines",
    category: "DevOps",
    tagline: "Automated software delivery pipelines and GitOps workflows.",
    description:
      "Accelerate feature releases with automated continuous integration and continuous delivery (CI/CD) pipelines, infrastructure testing, and zero-downtime deployment strategies.",
    image: "/services/real_arch.jpg",
    keyBenefits: [
      "Automated testing and release pipelines",
      "Zero-downtime canary and blue-green deployments",
      "Infrastructure drift detection and remediation",
      "GitOps version-controlled deployments",
    ],
    features: [
      {title: "Automated Pipelines", description: "Continuous integration pipelines executing unit and integration tests automatically."},
      {title: "Deployment Strategies", description: "Canary and blue-green deployment setups preventing production outages."},
    ],
    awsServicesUsed: ["AWS CodePipeline", "AWS CodeBuild", "GitHub Actions", "ArgoCD"],
  },
  {
    id: "svc-data-eng",
    slug: "data-engineering-analytics",
    title: "Data Engineering & Analytics",
    category: "Data & ML",
    tagline: "Scalable data lakes, real-time streaming, and BI analytics dashboards.",
    description:
      "Build modern data lakes and real-time streaming data pipelines to aggregate enterprise metrics and generate actionable business intelligence.",
    image: "/services/real_opt.jpg",
    keyBenefits: [
      "Centralized cloud data lake architecture",
      "Real-time data streaming and ETL processing",
      "Interactive Business Intelligence dashboards",
      "Row-level data governance and compliance",
    ],
    features: [
      {title: "Data Lakehouse Setup", description: "High-performance data storage combining S3 and AWS Glue catalogs."},
      {title: "Real-time ETL", description: "Stream processing with Apache Kinesis and AWS EMR."},
    ],
    awsServicesUsed: ["Amazon Redshift", "AWS Glue", "Amazon Athena", "Amazon QuickSight"],
  },
  {
    id: "svc-serverless",
    slug: "serverless-development",
    title: "Serverless Development",
    category: "Software Engineering",
    tagline: "Zero-server, event-driven architectures with pay-per-use efficiency.",
    description:
      "Develop lightweight, high-performance APIs and microservices using AWS Lambda, DynamoDB, and EventBridge for extreme operational cost savings.",
    image: "/services/real_custom.jpg",
    keyBenefits: [
      "Zero server provisioning or patch management",
      "Automatic scaling from zero to millions of requests",
      "Pay only for actual execution duration",
      "High fault tolerance built-in",
    ],
    features: [
      {title: "Event-Driven Workflows", description: "Asynchronous background processing using EventBridge and SQS."},
      {title: "NoSQL Database Integration", description: "Single-digit millisecond latency data access with DynamoDB."},
    ],
    awsServicesUsed: ["AWS Lambda", "Amazon DynamoDB", "Amazon EventBridge", "Amazon SQS"],
  },
  {
    id: "svc-k8s",
    slug: "containerization-kubernetes",
    title: "Containerization & Kubernetes",
    category: "DevOps",
    tagline: "Enterprise Docker container management and AWS EKS cluster deployment.",
    description:
      "Modernize legacy applications into containerized workloads managed by Amazon EKS and ECS, with automated autoscaling and service mesh routing.",
    image: "/services/real_migration.jpg",
    keyBenefits: [
      "Enterprise Kubernetes cluster management",
      "Microservices auto-scaling based on traffic load",
      "Secure service mesh communication",
      "Portable multi-cloud workload packaging",
    ],
    features: [
      {title: "EKS Cluster Provisioning", description: "Production-ready Managed Kubernetes clusters with Karpenter autoscaling."},
      {title: "Container Security", description: "Vulnerability scanning for container images in Amazon ECR."},
    ],
    awsServicesUsed: ["Amazon EKS", "Amazon ECS", "Amazon ECR", "AWS Fargate"],
  },
  {
    id: "svc-dr",
    slug: "disaster-recovery-backup",
    title: "Disaster Recovery & Backup",
    category: "Operations",
    tagline: "Automated multi-region disaster recovery and continuous data protection.",
    description:
      "Ensure business continuity with automated cross-region backup replication, failover testing, and rapid recovery procedures for critical databases.",
    image: "/services/real_managed.jpg",
    keyBenefits: [
      "Sub-minute Recovery Point Objective (RPO)",
      "Automated cross-region backup replication",
      "Compliance backup lifecycle policies",
      "Regular disaster recovery drills",
    ],
    features: [
      {title: "Cross-Region Failover", description: "Automated DNS failover switching traffic seamlessly to secondary regions."},
      {title: "Backup Encryption", description: "KMS-encrypted immutable backups preventing ransomware tampering."},
    ],
    awsServicesUsed: ["AWS Backup", "Amazon Route 53", "AWS Elastic Disaster Recovery"],
  },
  {
    id: "svc-gov",
    slug: "cloud-governance-compliance",
    title: "Cloud Governance & Compliance",
    category: "Security",
    tagline: "Automated policy enforcement, multi-account management, and audit readiness.",
    description:
      "Establish cloud landing zones with AWS Control Tower, centralized billing, SCP guardrails, and automated compliance auditing.",
    image: "/services/real_sec.jpg",
    keyBenefits: [
      "Multi-account AWS Landing Zone architecture",
      "Automated SCP security guardrails",
      "Centralized log aggregation and auditing",
      "SOC2 and ISO compliance dashboards",
    ],
    features: [
      {title: "Landing Zone Setup", description: "Multi-account organization structure enforcing security baselines."},
      {title: "Policy Guardrails", description: "Automated prevention of unauthorized service creation or public buckets."},
    ],
    awsServicesUsed: ["AWS Control Tower", "AWS Organizations", "AWS Config", "AWS Audit Manager"],
  },
  {
    id: "svc-genai-rag",
    slug: "enterprise-genai-rag",
    title: "Enterprise GenAI & RAG",
    category: "Artificial Intelligence",
    tagline: "Custom Retrieval-Augmented Generation pipelines for corporate knowledge bases.",
    description:
      "Connect proprietary company documents with state-of-the-art Large Language Models using Amazon Bedrock and vector databases.",
    image: "/services/real_ai.jpg",
    keyBenefits: [
      "Zero data leakage foundation model integration",
      "Vector search over millions of internal documents",
      "Sub-second response generation",
      "Role-based access control for AI answers",
    ],
    features: [
      {title: "Vector Database Setup", description: "Embeddings indexing in OpenSearch Serverless or Pinecone."},
      {title: "Custom RAG Agents", description: "AI agents providing cited answers from internal enterprise data stores."},
    ],
    awsServicesUsed: ["Amazon Bedrock", "Amazon OpenSearch", "AWS Lambda", "Amazon Kendra"],
  },
];
