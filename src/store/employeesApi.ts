import { createApi } from "@reduxjs/toolkit/query/react"
import type { Employee } from "@/types"

const mockEmployees: Employee[] = [
  {
    user_id: "Анна Ларионова",
    directions: [
      {
        name: "DB",
        competencies: [
          {
            name: "PostgreSQL",
            score: 4,
            answers: [
              {
                question: "Как вы настраивали репликацию в PostgreSQL?",
                text: "Я использовал streaming replication с hot standby.",
                audioUrl: "/audio/postgres_replication_anna.mp3"
              },
              {
                question: "Что знаете про WAL?",
                text: "Write Ahead Log — основа устойчивости транзакций.",
              }
            ]
          },            
          { name: "MySQL/MariaDB", score: 2 },
          { name: "ClickHouse", score: 3 },
          { name: "MS SQL", score: 2 },
          { name: "Redis", score: 3 },
          { name: "MongoDB", score: 3 },
        ],
        average: 3.17,
      },
      {
        name: "Automation",
        competencies: [
          { name: "Bash", score: 4 },
          { name: "Python", score: 3 },
          { name: "Terraform", score: 4 },
          { name: "Ansible", score: 4 },
          { name: "Helm", score: 3 },
          { name: "Gitlab-ci", score: 3 },
          { name: "Puppet", score: 2 },
        ],
        average: 3.29,
      },
      {
        name: "Other",
        competencies: [
          { name: "Kubernetes", score: 4 },
          { name: "Yandex Cloud", score: 3 },
          { name: "Git-flow", score: 4 },
          { name: "Jira-flow", score: 3 },
          { name: "Docker", score: 4 },
        ],
        average: 3.6,
      },
      {
        name: "Logs/Monitoring",
        competencies: [
          { name: "ELK", score: 3 },
          { name: "Zabbix", score: 2 },
          { name: "Prometheus", score: 4 },
          { name: "Grafana", score: 4 },
          { name: "Fluent-bit", score: 3 },
          { name: "OpenTelemetry", score: 2 },
          { name: "MicroMetrics", score: 3 },
          { name: "VictoriaMetrics", score: 2 },
        ],
        average: 2.88,
      },
      {
        name: "OS",
        competencies: [
          { name: "RHEL", score: 3 },
          { name: "CentOS", score: 4 },
          { name: "Ubuntu", score: 4 },
          { name: "Debian", score: 3 },
          { name: "Windows Server", score: 2 },
        ],
        average: 3.2,
      },
    ],
  },
  {
    user_id: "Анастасия Неводчикова",
    directions: [
      {
        name: "DB",
        competencies: [
          {
            name: "PostgreSQL",
            score: 4,
            answers: [
              {
                question: "Как вы настраивали репликацию в PostgreSQL?",
                text: "Я использовал streaming replication с hot standby.",
                audioUrl: "/audio/postgres_replication_anna.mp3"
              },
              {
                question: "Что знаете про WAL?",
                text: "Write Ahead Log — основа устойчивости транзакций.",
              }
            ]
          },            
          { name: "MySQL/MariaDB", score: 2 },
          { name: "ClickHouse", score: 3 },
          { name: "MS SQL", score: 2 },
          { name: "Redis", score: 3 },
          { name: "MongoDB", score: 3 },
        ],
        average: 2.5,
      },
      {
        name: "Brokers",
        competencies: [
          { name: "RabbitMQ", score: 3 },
          { name: "Kafka", score: 4 },
        ],
        average: 3.5,
      },
      {
        name: "Authentication, SSO",
        competencies: [
          { name: "Kerberos", score: 2 },
          { name: "AD", score: 3 },
          { name: "Keycloak", score: 3 },
        ],
        average: 2.67,
      },
      {
        name: "Web servers and Lb",
        competencies: [
          { name: "Nginx", score: 4 },
          { name: "Apache", score: 3 },
          { name: "Metallb", score: 2 },
          { name: "HAProxy", score: 3 },
        ],
        average: 3.0,
      },
      {
        name: "Network",
        competencies: [
          { name: "Iptables", score: 3 },
          { name: "WAF", score: 2 },
          { name: "Firewall", score: 2 },
          { name: "Security", score: 3 },
        ],
        average: 2.5,
      },
    ],
  },
  {
    user_id: "Егор Гусяков",
    directions: [
      {
        name: "DB",
        competencies: [
          { name: "PostgreSQL", score: 5 },
          { name: "MySQL/MariaDB", score: 4 },
          { name: "ClickHouse", score: 4 },
          { name: "MS SQL", score: 3 },
          { name: "Redis", score: 4 },
          { name: "MongoDB", score: 5 },
        ],
        average: 4.17,
      },
      {
        name: "Automation",
        competencies: [
          { name: "Bash", score: 4 },
          { name: "Python", score: 5 },
          { name: "Terraform", score: 5 },
          { name: "Ansible", score: 5 },
          { name: "Helm", score: 4 },
          { name: "Gitlab-ci", score: 4 },
          { name: "Puppet", score: 3 },
        ],
        average: 4.29,
      },
      {
        name: "Other",
        competencies: [
          { name: "Kubernetes", score: 5 },
          { name: "Yandex Cloud", score: 4 },
          { name: "Git-flow", score: 5 },
          { name: "Jira-flow", score: 4 },
          { name: "Docker", score: 5 },
        ],
        average: 4.6,
      },
      {
        name: "OS",
        competencies: [
          { name: "RHEL", score: 4 },
          { name: "CentOS", score: 5 },
          { name: "Ubuntu", score: 5 },
          { name: "Debian", score: 4 },
          { name: "Windows Server", score: 3 },
        ],
        average: 4.2,
      },
      {
        name: "Logs/Monitoring",
        competencies: [
          { name: "ELK", score: 4 },
          { name: "Zabbix", score: 5 },
          { name: "Prometheus", score: 5 },
          { name: "Grafana", score: 5 },
          { name: "Fluent-bit", score: 4 },
          { name: "OpenTelemetry", score: 3 },
          { name: "MicroMetrics", score: 4 },
          { name: "VictoriaMetrics", score: 3 },
        ],
        average: 4.13,
      },
    ],
  },
];

const mockBaseQuery = async () => {
  return { data: mockEmployees };
};

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: mockBaseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
