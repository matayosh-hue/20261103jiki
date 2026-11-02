import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // API endpoint for AI-assisted curriculum unit planning
  app.post('/api/generate-unit', async (req, res) => {
    try {
      const { subject, grade, domain, unitName, challengeTopic } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: 'GEMINI_API_KEY is not configured. Please use preset templates or set the key.' 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `あなたは文部科学省の中央教育審議会・学習指導要領改訂ワーキンググループの専門調査官・指導主事です。
次期学習指導要領における最重要キーワードである「統合的な理解」と「総合的な発揮」、および「二つが一体となった子供の姿」を、現場の小学校教員が明快にイメージし、単元指導計画や授業実践に直結できる具体例を作成してください。

対象条件:
- 教科: ${subject}
- 学年: ${grade}
- 領域/分野: ${domain}
- 単元名: ${unitName}
${challengeTopic ? `- 扱う題材や探究課題の希望: ${challengeTopic}` : ''}

【参考にする指導要領検討資料の枠組み】:
1. 「統合的な理解」: 学んできた知識・技能・見方・考え方がつながって見える状態。単元の中で複数の場面・表現を往還し、共通する本質に気付くこと。
2. 「総合的な発揮」: 教師が解法や方法を指定しない問題場面で、身に付けた見方・考え方を自ら選択・適用し、判断につなげる状態。
3. 「同じ問題に対する3人の子供の考え」:
   - 児童A: 表層的な一つの要素や数値だけを見て判断する姿
   - 児童B: 教わった個別の知識・計算技能を使って比較する姿（方法は使えるが本質的吟味には至らない）
   - 児童C: 総合的な発揮の姿（公平性や関係性に着目し、適切な方法を選び、結果を現実の問題文脈に戻して批判的・総合的に判断する）
4. 「思考プロセスの5ステップ」: ①見いだす → ②表層的判断の限界に気付く → ③本質的な関係・構造として捉える → ④適切な方法を選択・適用する → ⑤結果を現実の問題に戻して判断する
5. 「二つが一体となった姿」: 使うことで理解が深まり、理解が次の活用を支える往還サイクル

以下のJSONフォーマットのみを返してください（コードブロックなどの不要な装飾記号は極力含めず、純粋なJSONとして解釈可能にしてください）:
{
  "id": "generated-${Date.now()}",
  "subject": "${subject}",
  "grade": "${grade}",
  "domain": "${domain}",
  "unitName": "${unitName}",
  "perspective": "本単元で働かせる見方・考え方の要約（20〜40字）",
  "integratedUnderstanding": {
    "definition": "本単元における統合的な理解（学んだ個別知識がつながる状態）の定義（60〜100字）",
    "childrenUtterance": "気付いた子供のつぶやき「あれ？〇〇も△△も、結局は〜なんじゃない？」（子供らしいリアルな話し言葉）",
    "scenes": [
      {
        "title": "場面1のタイトル（例: 導入〜基礎場面）",
        "context": "場面の具体的な状況設定と数値・文脈",
        "knowledgeUsed": "ここで働く個別の知識・技能"
      },
      {
        "title": "場面2のタイトル（例: 展開〜発展場面）",
        "context": "場面の具体的な状況設定と数値・文脈",
        "knowledgeUsed": "ここで働く個別の知識・技能"
      },
      {
        "title": "場面3のタイトル（例: 統合・見方の一致場面）",
        "context": "場面の具体的な状況設定と数値・文脈",
        "knowledgeUsed": "共通する見方への気付き"
      }
    ],
    "keyTakeaway": "中教審資料に即したまとめの解説"
  },
  "holisticApplication": {
    "definition": "本単元における総合的な発揮（未知の場面で自ら判断に生かす状態）の定義（60〜100字）",
    "problemScene": {
      "title": "総合的な発揮が見られる問題場面のタイトル",
      "description": "教師が解法を指定しない、現実味のある課題状況の説明文",
      "dilemma": "子供たちが迷ったり議論になるポイント"
    },
    "childrenComparison": [
      {
        "child": "児童Aの考え",
        "type": "表層的な一つの数量・要素だけを見て判断",
        "thought": "児童Aの具体的なつぶやき・思考",
        "analysis": "教員から見た児童Aの認知状態の分析"
      },
      {
        "child": "児童Bの考え",
        "type": "個別の知識・技能を使って比較",
        "thought": "児童Bの具体的なつぶやき・思考",
        "analysis": "教員から見た児童Bの認知状態の分析"
      },
      {
        "child": "児童Cの考え",
        "type": "総合的な発揮の姿",
        "thought": "①〜④にわたる児童Cの筋道立った深い思考と現実への適用",
        "analysis": "何に着目し、どう判断したか（これが総合的な発揮である理由）"
      }
    ],
    "processSteps": [
      "① 何と何を比べるべきか（検討すべきか）を見いだす",
      "② 単純な数値・表層の比較では適切に判断できないと判断する",
      "③ 二つの数量の関係（本質的な因果・構造）として捉える",
      "④ 適切な方法を選択して多角的に分析・比較する",
      "⑤ 得られた結果を現実の問題文脈に戻して判断・決定する"
    ]
  },
  "unifiedCycle": {
    "coreMessage": "二つが一体となった子供の姿の要約",
    "interactionText": "使うことで理解が深まり、理解が次の活用を支える具体的な学びの循環",
    "practicalOutcome": "日常生活や他教科・次学年にどう生きて働く力になるか"
  },
  "teacherAdvice": {
    "keyPoints": [
      "指導の急所1: 複数の場面や表現を往還させ、共通点に気付かせる手立て",
      "指導の急所2: 教師が解法を指定せず、児童自らが方法を選択する場面設定",
      "指導の急所3: 行きつ戻りつしながら思考を深める支援"
    ],
    "questioningExamples": [
      "児童の統合的な気付きを引き出す問いかけ例",
      "判断の根拠を現実に戻して説明させる問いかけ例"
    ],
    "assessmentFocus": "見取りと評価の具体例（ルーブリック視点）"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const responseText = response.text || '{}';
      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (err: any) {
      console.error('Gemini generate error:', err);
      return res.status(500).json({ error: err.message || 'AI生成中にエラーが発生しました' });
    }
  });

  // Vite middleware in dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production build
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
