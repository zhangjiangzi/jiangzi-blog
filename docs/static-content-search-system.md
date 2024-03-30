## 如何衡量搜索能力？

一些可能的衡量标准：

有效性和准确性：搜索结果是否准确
1. **准确度**
2. **召回率**
3. **排序合理程度**

效率：对一个 query，能够多快得到结果，需要多少的计算资源
- 衡量空间和**时间开支**

可用性：一个系统对一个真实的用户来说有用的程度
- 用户反馈

要衡量一个搜索工具是否好用，我们需要搜集以下指标：

- 准确度(Precision)
- 召回率(Recall)
- 排序合理程度
- 计算耗时

### 如何计算

#### 1. 准确度(Precision) 和 召回率(Recall)

![准确度(Precision) 和 召回率(Recall)](/images/img1.png)

- 准确率的定义
  > 搜索结果中，与 query 相关的文档在搜索结果的占比。也就是衡量检索的结果是否都是相关的

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>P</mi><mi>r</mi><mi>e</mi><mi>c</mi><mi>i</mi><mi>s</mi><mi>i</mi><mi>o</mi><mi>n</mi><mo>=</mo><mfrac><mi>a</mi><mrow><mi>a</mi><mo>+</mo><mi>c</mi></mrow></mfrac></math>

- 召回率的定义
  > 搜索结果中，与 query 相关的文档在所有实际与 query 相关的文档的占比。也就是衡量相关的文档是否全部都被检索到了

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>R</mi><mi>e</mi><mi>c</mi><mi>a</mi><mi>l</mi><mi>l</mi><mo>=</mo><mfrac><mi>a</mi><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfrac></math>

#### 2. 调和平均数 F1

理想情况下，我们希望准确率和召回率有 𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛 = 𝑅𝑒𝑐𝑎𝑙𝑙 = 1.0，但是**实际上高的召回率通常意味着较低的准确率**！<br />
我们引入调和平均数 F1，对准确率和召回率进行权衡：

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>F</mi><mn>1</mn><mo>=</mo><mfrac><mrow><mn>2</mn><mi>P</mi><mi>R</mi></mrow><mrow><mi>P</mi><mo>+</mo><mi>R</mi></mrow></mfrac></math>

<Admonition type="info" icon="🔖" title="我们为什么不用 0.5P + 0.5R 来衡量一个算法呢？">
  如果计算算法平均值，而算法平均值都是用的和来计算的，那么算法平均值的结果就会被一个非常大的值所左右，而几乎不用考虑其余小的值的影响！而调和平均数 F1 可以避免这种情况。
</Admonition>

#### 3. 排序合理分数

<Admonition type="tip" icon="😲" title="如何衡量搜索结果的排序是合理的？如何确认搜索算法是否将相关度更高的结果展示在更前的位置呢？">
  <p>目前并没有找到一个前置的验证方式，但是找到了</p>
  <p>&emsp;&emsp; <strong>DCG</strong>（Discounted cumulative gain）折损累计增益，用来衡量和评价搜索结果的算法。</p>
  <p>它是一个对搜索结果的<strong>相关程度</strong>进行衡量计算得分的算法。</p>
  <p><strong>个人认为</strong>，衡量排序合理程度实际上就是衡量 query 和文档的相关度的计算是否合理。本工具将以 DCG 的计算结果为依据计算排序合理分数这个指标。</p>
</Admonition>

**DCG 算法的简单描述**

个人对于 DCG 一个简单易懂的描述是：在一组搜索结果中，用户对于各个结果具有不同的喜爱程度，用户对于排在前面的搜索结果喜爱程度越高，说明排序的合理程度越高，反之，如果用户对于排在后面的搜索结果喜爱程度更高，排序合理评分也就越低。

**DCG 的两个思想：**

1. 高关联度的结果比一般关联度的结果更影响最终的指标得分；
2. 有高关联度的结果出现在更靠前的位置的时候，指标会越高；

**累计增益（CG）**

> CG，也称为 Cumulative Gain（累计增益），表示在一个排名列表中，根据排名顺序逐个累加每个项目的相关度得分，从而衡量排序质量。

指定位置 p 上的 CG 为：

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>C</mi><msub><mi>G</mi><mrow><mi>p</mi></mrow></msub><mo>=</mo><munderover><mo data-mjx-texclass="OP">∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>p</mi></mrow></munderover><mi>r</mi><mi>e</mi><msub><mi>l</mi><mrow><mi>i</mi></mrow></msub></math>

rel(i) 代表 i 这个位置上的相关度。

**折损累计增益（DCG）**

> DCG， Discounted 的 CG，就是在每一个 CG 的结果上处以一个折损值。<br/>
> 为什么要这么做呢？目的就是为了让排名越靠前的结果越能影响最后的结果。假设排序越往后，价值越低。

到第 i 个位置的时候，它的价值是 1/log(2)(i+1)，那么第 i 个结果产生的效益就是 rel(i) \* 1/log(2)(i+1)，所以：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>D</mi><mi>C</mi><msub><mi>G</mi><mrow><mi>p</mi></mrow></msub><mo>=</mo><munderover><mo data-mjx-texclass="OP">∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>p</mi></mrow></munderover><mfrac><mrow><mi>r</mi><mi>e</mi><msub><mi>l</mi><mrow><mi>i</mi></mrow></msub></mrow><mrow><msub><mi>log</mi><mrow><mn>2</mn></mrow></msub><mo data-mjx-texclass="NONE">⁡</mo><mrow><mo stretchy="false">(</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></mrow></mfrac></math>
&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>D</mi><mi>C</mi><msub><mi>G</mi><mrow><mi>p</mi></mrow></msub><mo>=</mo><mi>r</mi><mi>e</mi><msub><mi>l</mi><mrow><mn>1</mn></mrow></msub><mo>+</mo><munderover><mo data-mjx-texclass="OP">∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>p</mi></mrow></munderover><mfrac><mrow><mi>r</mi><mi>e</mi><msub><mi>l</mi><mrow><mi>i</mi></mrow></msub></mrow><mrow><msub><mi>log</mi><mrow><mn>2</mn></mrow></msub><mo data-mjx-texclass="NONE">⁡</mo><mrow><mo stretchy="false">(</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></mrow></mfrac></math>

还有另外一种 DCG 的算法：

&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>D</mi><mi>C</mi><msub><mi>G</mi><mrow><mi>p</mi></mrow></msub><mo>=</mo><munderover><mo data-mjx-texclass="OP">∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>p</mi></mrow></munderover><mfrac><mrow><msup><mn>2</mn><mrow><mi>r</mi><mi>e</mi><msub><mi>l</mi><mrow><mi>i</mi></mrow></msub></mrow></msup><mo>−</mo><mn>1</mn></mrow><mrow><msub><mi>log</mi><mrow><mn>2</mn></mrow></msub><mo data-mjx-texclass="NONE">⁡</mo><mrow><mo stretchy="false">(</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></mrow></mfrac></math>

<Admonition type="caution" icon="😲" title="为什么不使用 NDCG（归一化折损累计增益）进行排序得分计算呢？">
  NDCG 算法实际上是对 DCG 的结果进一步进行归一化处理。实际上，只使用 DCG 并不是不需要归一化，而是我会手动使用 BM25 的计算结果进行归一化处理，至于为什么这么做详见下文。
</Admonition>

#### 4. 计算耗时

这个理解就比较简单，计算的耗时是指从开始搜索到获取结果所消耗的时间。

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>T</mi><mo>=</mo><msub><mi>T</mi><mrow><mi>e</mi><mi>n</mi><mi>d</mi></mrow></msub><mo>−</mo><msub><mi>T</mi><mrow><mi>s</mi><mi>t</mi><mi>a</mi><mi>r</mi><mi>t</mi></mrow></msub></math>

- 在一般情况下，搜索数据量大概在几十篇文章，各个搜索工具表现大差不差，这个指标不是很重要
- 搜索数据量如果在上百，几百篇文章，搜索速度会成为我们必须考虑的问题。特别是在浏览器执行大量的搜索计算会对主线程造成阻塞。

### 使用 BM25 作为衡量基准

在上文介绍了参数的定义和计算方式，接下来迎来另外一个重要的问题：如何判断一个 query 与一个文档是否相关以及它们之间的相关程度呢？

这个问题是一个非常重要且棘手的问题，搜索出来的结果是否准确相关对于不同的用户有不同的答案。我们需要找到一个尽可能的符合大部分用户认知上的对于 query 和文档的相关程度的算法。相关算法不是很多，结论是我选择了 BM25。

#### BM25

> Okapi BM25，一般简称 BM25 算法，在 20 世纪 70 年代到 80 年代，由英国一批信息检索领域的计算机科学家发明。这里的 BM 是“最佳匹配”（Best Match）的缩写。

在信息检索领域，BM25 算法是工程实践中举足轻重的重要的 Baseline 算法。迄今为止距 BM25 的提出已经过去三十多年，但是这个算法依然在很多信息检索的任务中表现优异，是很多工程师首选的算法之一。

**BM25 的用途**

BM25 算法实质上是一个用于信息检索中，对给定查询（query）和若干“相关”文档（document）进行相关性排序打分的排序函数。一般情况下，这个相关性打分是一个类似 TF-IDF 的基于统计计数的无监督学习过程。

**BM25 算法其主要思想**

- 对 query 进行特征提取分解，生成若干特征项（词）𝑞𝑖；
- 然后对于每个搜索结果 𝐷，计算每个特征 𝑞𝑖 与 𝐷 的相关性得分；
- 最后，将 𝑞𝑖 相对于 𝐷 的相关性得分进行加权求和，从而得到 query 与 𝐷 的相关性得分。

**BM25 的简写公式：**

&emsp;&emsp;&emsp;&emsp;<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mi>s</mi><mi>c</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>d</mi><mo stretchy="false">)</mo><mo>=</mo><munder><mo data-mjx-texclass="OP">∑</mo><mrow><mi>i</mi></mrow></munder><msub><mi>W</mi><mi>i</mi></msub><mo>⋅</mo><mi>R</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo>,</mo><mi>d</mi><mo stretchy="false">)</mo></math>

其中，𝑞 表示 query；𝑞𝑖 表示 𝑞 分解之后的一个特征项（对中文而言我们可以把对 query 的分词作为基本特征项）；𝑑 表示一个搜索结果文档；𝑊𝑖 表示特征 𝑞𝑖 的权重；𝑅(𝑞𝑖,𝑑) 表示特征项 𝑞𝑖 与文档 𝑑 的相关性得分。

#### BM25 在计算中的作用

我们来回答上文中提出的问题

<Admonition type="info" icon="📌" title="如何判断一个 query 与一个文档是否相关以及它们之间的相关程度呢？">
  <p>在上文中，关于准确率和召回率的计算，其实是<strong>预设</strong>了在已经确定哪一部分文档是 query 相关，哪一部分文档是 query 不相关的前提下进行计算。关于排序合理评分的计算上，我们也是<strong>预设</strong>了在已经确定的各个文档对于 query 相关度评分的前提下进行计算。</p>
  <p>说到底，我们所说的“预设”实际上是一个标准，是一个可以信赖的结果。对于一个搜索工具搜索能力的衡量打分，其实可以说是相对于一个令人满意的标准结果进行打分。</p>
</Admonition>

如上文所说，我选取了 BM25 作为这个标准，以 BM25 的搜索结果作为 💯 的标准答案对目标搜索方案产生的搜索结果进行打分。换一种方式来说，我做的事情是以 BM25 的表现对各个搜索工具进行归一化，使得多个搜索工具可以互相进行量化和比较。

接下来我会详细介绍 BM25 是如何参与计算的。

- 准确率和召回率
  - 将 query 分别和各个搜索文档通过 BM25 进行计算
  - 得到每个文档对于 query 的相关性得分
  - 将评分大于某个设定数值的文档收集起来并进行从大到小的排序，这些文档会被认定为与 query 相关的文档（也就是 a + b ）
  - 其他文档会被认定为与 query 不相关的文档（也就是 c + d ）
  - 最后取测试搜索结果（a + c）与 BM25 的搜索结果（a + b）的交集作为 a 的值，计算准确率和召回率
- 排序合理评分

  排序合理评分采用 DCG 算法进行计算。上文说到 DCG 的计算依据是根据搜索结果的相关度进行计算，这里的相关度使用的不是测试搜索功能为我们计算的相关度分数，而是采用 BM25 对搜索结果中的每个文档与 query 进行计算得出的相关度分数。

  也就是说，我把 BM25 的计算得出的相关度分数作为用户的喜爱值，对测试出来的搜索结果进行排序合理性计算。

  同时，为了归一化处理，会将 BM25 的搜索结果对自身进行 DCG 评分计算，以这个分数作为满分结果，对搜索功能进行百分制打分，从而拿到最终的排序合理分数。

<Admonition type="danger" icon="❗" title="注意">
  DCG 算法可能更多的是运用在 A/B 实验中根据用户的反馈去进行排序校验，引入 BM25 模拟用户的喜爱反馈是在本工具独创的，不具备相关理论依据以及参考实践
</Admonition>

<Admonition type="info" icon="💡" title="排序合理评分有可能达到 100 吗？">
  是有可能的！虽然 DCG 算法是一个单调递增的函数（是一个非线性的缓慢增长的函数），但是在测试结果非常精准但少的情况下（准确率高、召回率、结果几乎都为相关评分非常高），排序评分会是一个比较高的值，那些相关评分比较低的文档对于排序分数影响将会非常小，在归一化处理过程中非常容易被四舍五入掉了~（这个也是合理的，末尾几个相关度很低很低的文档排在倒一还是倒二我们并不需要在乎）
</Admonition>

## 总结

- 衡量搜索功能的指标
  - 准确率：衡量搜索结果的准确程度
  - 召回率：衡量相关数据是否都被搜索到了
  - 排序合理性评分：衡量搜索结果的排序合理程度
  - 计算耗时：搜索耗时
- 以 BM25 计算结果作为衡量基准
