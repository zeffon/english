import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

type ModuleProps = {
  idx?: number
  title: string
  description: JSX.Element
}

const ModuleList: ModuleProps[] = [
  {
    title: '前序阶段',
    description: (
      <div>
        对英语口语的总体认识（<Link to="/symbol/">发音</Link>、
        <Link to="/docs/pronunce">说话方式</Link>、<Link to="/docs/grammarly">语法</Link>、
        <Link to="/docs/vocabulary">词汇</Link>
        等）
      </div>
    )
  },
  {
    title: '语音的训练',
    description: (
      <>
        <div>
          英语的语音分成pronunciation（<Link to="/symbol/">发音</Link>）和pronunciation features（
          <Link to="/docs/pronunce">语音技巧</Link>）。
        </div>
        <div>
          【第一周·<Link to="/symbol/">纠音练习</Link>
          】使用<Link to="/docs/pronunciation">教材</Link>
          (剑桥国际英语语音在用初级+中级+高级共3本)和口型模仿素材纠音。
        </div>
        <div>
          【第二周·<Link to="/docs/marking">语音标记</Link>
          】跟读牛津160句，每天5句话，进行语音标记并从小到大，逐词，逐短语，逐句地进行跟读练习，次数不限，最好可以脱口而出。
        </div>
      </>
    )
  },
  {
    title: '对话的流畅和拓展',
    description: (
      <>
        <div>第三&四&五&六周【词汇-句型-*-想法】</div>
        <div>【词】每天背2-4个单词，尝试记住尽量多的意思</div>
        <div>【句】并且用所背单词进行造句练习</div>
        <div>【想法】再把句子应用到该单词意思可以应用到的场景下</div>
      </>
    )
  },
  {
    title: '语料的积累',
    description: (
      <>
        <div>
          【第三周】每天10分钟<Link to="/docs/corpus">老友记</Link>
          ，10分钟的老友记要当成1个小时来看，有没有中文字幕无所谓，保证理解，可以直接把原句复制粘贴到word文档中，打印出来，按照剧集中的语调大致做一下语音标记，开始逐词逐句朗读，一次性只能读一句话，该句读好以后读下一句。全部读好以后反复朗读，直到脱口而出。
        </div>
        <div>
          【第四周】按照第三周步骤操作，3集以后，开始回顾，回顾过程中需要去掉字幕（中英文）。如有不理解，笔记记录，全部看完后打开屏蔽字幕，仔细分析听不懂的问题所在，并练习。继续跟读练习。
        </div>
        <div>
          【第五周】开始结合剧集和造句练习，把剧集中的词或者句联想场景并且应用进去，反复操练。
        </div>
        <div>【第六周】继续结合词汇造句练习，尝试把词和句联想应用进不同场景，并且演练。</div>
        <div>
          【第七&八周】对应美剧的台词，造句练习的联想语段，和每天学习过的单词进行复盘，背诵。这个阶段相对应该非常简单了，因为如果之前按照此方法做了的话，就会发现很多东西已经养成了口腔肌肉习惯，再背诵就很容易（能用语感顺下来-脱口而出）。
        </div>
      </>
    )
  },
  {
    title: '实战训练',
    description: (
      <>
        <div>实战对象：外国留学生，英美澳新人</div>
        <div>训练内容：聊天</div>
        <div>注意：请待在自己的comfort zone里，尝试着把话题引到【造句练习的场景】中</div>
        <div>
          请一定要自信，不要紧张。不要担心犯错，母语为英语的人依然会经常犯错，换位思考，如果一个中文犯错的外国人，我们会有什么感觉？完全可以容忍，也没啥感觉对吧？所以请一定不要担心犯错.
        </div>
      </>
    )
  }
]

function ModuleItem({ title, description, idx }: ModuleProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md">
        <div className={styles.moduleIndex}>{idx}</div>
        <h3>{title}</h3>
        <div className={styles.moduleDescription}>{description}</div>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.prologue}>
          本英语学习方法来自知乎的帖子 -
          <Link href="https://www.zhihu.com/question/20097263"> 怎么练好英语口语？</Link>
          的高分回答。
        </div>
        <div className={`text--center row ${styles.moduleContainer}`}>
          {ModuleList.map((props, idx) => (
            <ModuleItem key={idx} {...props} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
