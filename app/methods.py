import numpy as np
from typing import Counter
import math

class Method():


    def __init__(self) -> None:
        pass
    
    def convert(self, data):
        A, B = data['A'].split(' '), data['B'].split(' ')
        A = list(filter(None, A))
        B = list(filter(None, B))
        A = sorted(A)
        B = sorted(B)
        A = [int(i) for i in A]
        B = [int(i) for i in B]
        return A, B
    
    def frequency(self, A):
        res = []
        for i in A.keys():
            res.append(A[i])
        return res

    def acc_frequency(self, frequency):
        res = [0 for i in range(len(frequency))]
        for i in range(len(frequency)):
            for j in range(i + 1):
                res[i] += frequency[j]
        return res

    def rel_frequency(self, frequency, length):
        res = []
        for i in range(len(frequency)):       
            res.append(frequency[i] / length)
        return res

    def cum_rel_frequency(self, rel_frequency):
        res = [0 for i in range(len(rel_frequency))]
        for i in range(len(rel_frequency)):
            for j in range(i + 1):
                res[i] += rel_frequency[j]
        return res


    def task1(self, data):

        sample, mode, frequency, acc_frequency, rel_frequency, cum_rel_frequency = [], [], [], [], [], []
        A, B = self.convert(data)

        sample.append(sorted(set(A)))
        sample.append(sorted(set(B)))

        mode.append(Counter(A))
        mode.append(Counter(B))

        frequency.append(self.frequency(mode[0]))
        frequency.append(self.frequency(mode[1]))

        acc_frequency.append(self.acc_frequency(frequency[0]))
        acc_frequency.append(self.acc_frequency(frequency[1]))

        rel_frequency.append(self.rel_frequency(frequency[0], len(A)))
        rel_frequency.append(self.rel_frequency(frequency[1], len(B)))

            
        cum_rel_frequency.append(self.cum_rel_frequency(rel_frequency[0]))
        cum_rel_frequency.append(self.cum_rel_frequency(rel_frequency[1]))


        return  {
                    'sample': sample,
                    'freq': frequency,
                    'acc_freq': acc_frequency,
                    'rel_freq': rel_frequency,
                    'cum_rel_freq': cum_rel_frequency
                }
        

    def empirical_function(self, x, frequency, length):

        rel_frequency = self.rel_frequency(frequency, length) 
        cum_rel_frequency = self.cum_rel_frequency(rel_frequency)
        string = '<table><th>An empirical distribution function<th>'
        for i in range(len(cum_rel_frequency)):
            if i == 0:
                string += f'<tr><td>{round(cum_rel_frequency[i], 3)}, if  x <= {x[i]}<tr><td>'
            elif i == len(frequency) - 1:
                string += f'<tr><td>{round(cum_rel_frequency[i], 3)}, if x >= {x[i-1]}<tr><td>'
            else:
                string += f'<tr><td>{round(cum_rel_frequency[i], 3)}, if {x[i-1]} < x <= {x[i]}<tr><td>'
        string += '</table>'
        return string, cum_rel_frequency





    def task2(self, data):
        a, b = [], []
        A, B = self.convert(data)

        # Все элементы
        a.append(A)
        b.append(B)

        # Уникальные элементы
        unique_A = list(set(A))
        unique_B = list(set(B))
        a.append(unique_A)
        b.append(unique_B)

        # Значения моды
        a.append([Counter(A)[i] for i in unique_A])
        b.append([Counter(B)[i] for i in unique_B])

        # Эмпирические функции
        ta, la = self.empirical_function(a[1], a[2], len(A))
        tb, lb = self.empirical_function(b[1], b[2], len(B))
        a.append(ta)
        a.append(la)
        b.append(tb)
        b.append(lb)

        return {
            'type': 'result', 
            'data': {
                'a': a,
                'b': b
            }
        }
        
        


    def task3(self, data):

        A, B = self.convert(data)
        mean, median, fashion, dispersion, coeff_var = [], [], [], [], []
        central_moment_3, central_moment_4, asymmetry, excess = [], [], [], []

        # Среднее арифметическое
        mean.append(sum(A) / len(A))
        mean.append(sum(B) / len(B))
        # Медиана
        median.append(self.median(A))
        median.append(self.median(B))    
        # Мода
        fashion.append(Counter(A).most_common()[0][0])
        fashion.append(Counter(B).most_common()[0][0])

        # Дисперсия выборки
        sample_variance = [self.dispersion(A, mean[0], 1), self.dispersion(B, mean[1], 1)]
        cor_st_deviation = [math.sqrt(sample_variance[0]), math.sqrt(sample_variance[1])]
        # Обычная дисперсия
        dispersion.append(self.dispersion(A, mean[0], 0))
        dispersion.append(self.dispersion(B, mean[1], 0))
           
        # Среднеквадратичное отклонение или стандартное отклонение
        sample_deviation = [math.sqrt(dispersion[0]), math.sqrt(dispersion[1])] # Корень из дисперсии

        # math.sqrt(dispersion)

        # Делим стандартное отклонение на выборочное среднее и умноженое на 100%
        coeff_var.append((sample_deviation[0] / mean[0]) * 100)
        coeff_var.append((sample_deviation[1] / mean[1]) * 100)

        # Моменты 3-4 порядка
        central_moment_3.append(sum([math.pow((i - mean[0]), 3) for i in A]))
        central_moment_3.append(sum([math.pow((i - mean[1]), 3) for i in B]))
        
        central_moment_4.append(sum([math.pow((i - mean[0]), 4) for i in A]))
        central_moment_4.append(sum([math.pow((i - mean[1]), 4) for i in B]))

        # asymmetry 
        # Момент делим на куб стандартного выборочного отклонения
        asymmetry.append(central_moment_3[0] / math.pow(sample_deviation[0], 3))
        asymmetry.append(central_moment_3[1] / math.pow(sample_deviation[1], 3))

        # excess
        # Момент делим на куб стандартного выборочного отклонения
        excess.append(central_moment_4[0] / math.pow(sample_deviation[0], 4))
        excess.append(central_moment_4[1] / math.pow(sample_deviation[1], 4))

        return {
            'type': 'result', 
            'data': {
                'mean': mean,
                'median': median,
                'fashion': fashion,
                'sample_variance': sample_variance,
                'sample_deviation': sample_deviation,
                'coeff_var': coeff_var,
                'central_moment_3': central_moment_3,
                'central_moment_4': central_moment_4,
                'asymmetry': asymmetry,
                'excess': excess,
                'variance fixed': dispersion,
                'corrected standard deviation': cor_st_deviation
            }
        }
    
    def median(self, sample):

        if len(sample) % 2 == 0:
            i = int(len(sample) / 2)
            return (sample[i] + sample[i - 1]) / 2
        else:
            i = int((len(sample) - 1) / 2)
            return sample[i]

    def dispersion(self, A, mean, act):
        return sum([(i - mean)**2 for i in A]) / (len(A) - act)



# Formules
# http://mathprofi.ru/formula_dispersii_standartnoe_otklonenie_koefficient_variacii.html
# http://www.mathprofi.ru/asimmetriya_i_excess.html