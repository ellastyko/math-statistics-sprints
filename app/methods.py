
import numpy as np
from typing import Counter


class Method():


    def __init__(self) -> None:
        pass
    
    def task1(self, data):
        A = data['A'].split(' ')
        B = data['B'].split(' ')

        A = list(filter(None, A))
        B = list(filter(None, B))

        sample = sorted(set(A + B))

        mode = Counter(A + B)
        frequency = []
        for i in mode.keys():
            frequency.append(mode[i])
        

        acc_frequency = np.zeros(len(frequency))
        for i in range(len(frequency)):
            for j in range(i + 1):
                acc_frequency[i] += frequency[j]

        rel_frequency = np.zeros(len(frequency))
        for i in range(len(frequency)):       
            rel_frequency[i] = frequency[i] / len(A + B)
            
        cum_rel_frequency = np.zeros(len(rel_frequency))
        for i in range(len(frequency)):
            for j in range(i + 1):
                cum_rel_frequency[i] += rel_frequency[j]

        return {
            'type': 'result', 
            'data': {
                'sample': sample,
                'freq': frequency,
                'acc_freq': acc_frequency.tolist(),
                'rel_freq': rel_frequency.tolist(),
                'cum_rel_freq': cum_rel_frequency.tolist()
            }
        }


        
    